import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto, QueryProjectsDto, ProjectStatus } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all projects with filtering, pagination, and search
   */
  async findAll(query: QueryProjectsDto) {
    const { orgId, departmentId, status, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {};

    // Filter by organization
    if (orgId) {
      where.orgId = orgId;
    }

    // Filter by department
    if (departmentId) {
      where.departmentId = departmentId;
    }

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.project.count({ where });

    // Get projects with relations
    const projects = await this.prisma.project.findMany({
      where,
      include: {
        department: {
          select: { id: true, name: true },
        },
        _count: {
          select: {
            tasks: true,
            workflows: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Get task statistics for each project
    const projectsWithStats = await Promise.all(
      projects.map(async (project) => {
        const taskStats = await this.getTaskStats(project.id);
        return {
          ...project,
          taskStats,
        };
      }),
    );

    return {
      data: projectsWithStats,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find a single project by ID
   */
  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        department: {
          select: { id: true, name: true, description: true },
        },
        tasks: {
          include: {
            assignee: {
              select: { id: true, name: true, email: true, avatar: true },
            },
            agent: {
              select: { id: true, name: true, type: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        workflows: {
          select: {
            id: true,
            name: true,
            status: true,
            trigger: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            status: true,
            deploymentUrl: true,
          },
        },
        org: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Get detailed statistics
    const stats = await this.getDetailedStats(id);

    return {
      ...project,
      stats,
    };
  }

  /**
   * Create a new project
   */
  async create(dto: CreateProjectDto) {
    // Verify organization exists
    const org = await this.prisma.org.findUnique({
      where: { id: dto.orgId },
    });

    if (!org) {
      throw new NotFoundException(`Organization with ID "${dto.orgId}" not found`);
    }

    // Check if project with same name exists in org
    const existingProject = await this.prisma.project.findFirst({
      where: {
        name: dto.name,
        orgId: dto.orgId,
      },
    });

    if (existingProject) {
      throw new ConflictException(
        `Project with name "${dto.name}" already exists in this organization`,
      );
    }

    // Verify department exists if provided
    if (dto.departmentId) {
      const department = await this.prisma.department.findUnique({
        where: { id: dto.departmentId },
      });

      if (!department) {
        throw new NotFoundException(`Department with ID "${dto.departmentId}" not found`);
      }
    }

    // Create project with default workflow if template is specified
    const project = await this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        orgId: dto.orgId,
        departmentId: dto.departmentId,
        template: dto.template,
        status: ProjectStatus.PLANNING,
      },
      include: {
        department: true,
        org: true,
      },
    });

    // If template is specified, create default workflow
    if (dto.template) {
      await this.createDefaultWorkflow(project.id, dto.template);
    }

    return project;
  }

  /**
   * Update a project
   */
  async update(id: string, dto: UpdateProjectDto) {
    // Check if project exists
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // If changing name, check for duplicates
    if (dto.name && dto.name !== existingProject.name) {
      const duplicate = await this.prisma.project.findFirst({
        where: {
          name: dto.name,
          orgId: existingProject.orgId,
          id: { not: id },
        },
      });

      if (duplicate) {
        throw new ConflictException(
          `Project with name "${dto.name}" already exists in this organization`,
        );
      }
    }

    // Verify department exists if being updated
    if (dto.departmentId) {
      const department = await this.prisma.department.findUnique({
        where: { id: dto.departmentId },
      });

      if (!department) {
        throw new NotFoundException(`Department with ID "${dto.departmentId}" not found`);
      }
    }

    return this.prisma.project.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status,
        departmentId: dto.departmentId,
      },
      include: {
        department: true,
        org: true,
      },
    });
  }

  /**
   * Delete a project
   */
  async remove(id: string) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tasks: true, workflows: true },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Archive instead of delete if project has tasks
    if (project._count.tasks > 0 || project._count.workflows > 0) {
      return this.prisma.project.update({
        where: { id },
        data: { status: ProjectStatus.ARCHIVED },
      });
    }

    // Delete if no tasks
    return this.prisma.project.delete({
      where: { id },
    });
  }

  /**
   * Get project statistics
   */
  async getStats(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return this.getDetailedStats(id);
  }

  /**
   * Get task statistics for a project
   */
  private async getTaskStats(projectId: string) {
    const tasks = await this.prisma.task.groupBy({
      by: ['status'],
      where: { projectId },
      _count: true,
    });

    const priorities = await this.prisma.task.groupBy({
      by: ['priority'],
      where: { projectId },
      _count: true,
    });

    return {
      byStatus: tasks.reduce((acc, t) => {
        acc[t.status] = t._count;
        return acc;
      }, {} as Record<string, number>),
      byPriority: priorities.reduce((acc, t) => {
        acc[t.priority] = t._count;
        return acc;
      }, {} as Record<string, number>),
      total: tasks.reduce((sum, t) => sum + t._count, 0),
    };
  }

  /**
   * Get detailed statistics for a project
   */
  private async getDetailedStats(projectId: string) {
    const [taskStats, workflowStats, executionStats] = await Promise.all([
      this.getTaskStats(projectId),
      this.getWorkflowStats(projectId),
      this.getExecutionStats(projectId),
    ]);

    return {
      tasks: taskStats,
      workflows: workflowStats,
      executions: executionStats,
    };
  }

  /**
   * Get workflow statistics
   */
  private async getWorkflowStats(projectId: string) {
    const workflows = await this.prisma.workflow.groupBy({
      by: ['status'],
      where: { projectId },
      _count: true,
    });

    return {
      byStatus: workflows.reduce((acc, w) => {
        acc[w.status] = w._count;
        return acc;
      }, {} as Record<string, number>),
      total: workflows.reduce((sum, w) => sum + w._count, 0),
    };
  }

  /**
   * Get execution statistics
   */
  private async getExecutionStats(projectId: string) {
    const executions = await this.prisma.execution.findMany({
      where: {
        workflow: { projectId },
      },
      select: {
        status: true,
        createdAt: true,
      },
    });

    const byStatus = executions.reduce((acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const last7Days = executions.filter(
      (e) => e.createdAt >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length;

    return {
      byStatus,
      total: executions.length,
      last7Days,
    };
  }

  /**
   * Create default workflow based on template
   */
  private async createDefaultWorkflow(projectId: string, template: string) {
    const workflowTemplates: Record<string, { name: string; description: string; steps: any[] }> = {
      'saas-starter': {
        name: 'SaaS Development Workflow',
        description: 'Standard SaaS product development workflow',
        steps: [
          { name: 'Requirements Analysis', type: 'agent', agentType: 'PRODUCT_MANAGER' },
          { name: 'Architecture Design', type: 'agent', agentType: 'ARCHITECT' },
          { name: 'Backend Development', type: 'agent', agentType: 'BACKEND_DEVELOPER' },
          { name: 'Frontend Development', type: 'agent', agentType: 'FRONTEND_DEVELOPER' },
          { name: 'Testing', type: 'agent', agentType: 'QA_ENGINEER' },
          { name: 'Deployment', type: 'agent', agentType: 'DEVOPS_ENGINEER' },
        ],
      },
      'api-only': {
        name: 'API Development Workflow',
        description: 'API-focused development workflow',
        steps: [
          { name: 'API Design', type: 'agent', agentType: 'ARCHITECT' },
          { name: 'Implementation', type: 'agent', agentType: 'BACKEND_DEVELOPER' },
          { name: 'Documentation', type: 'agent', agentType: 'TECHNICAL_WRITER' },
          { name: 'Testing', type: 'agent', agentType: 'QA_ENGINEER' },
        ],
      },
      'frontend-only': {
        name: 'Frontend Development Workflow',
        description: 'Frontend-focused development workflow',
        steps: [
          { name: 'UI/UX Design', type: 'agent', agentType: 'UI_UX_DESIGNER' },
          { name: 'Implementation', type: 'agent', agentType: 'FRONTEND_DEVELOPER' },
          { name: 'Testing', type: 'agent', agentType: 'QA_ENGINEER' },
        ],
      },
    };

    const templateConfig = workflowTemplates[template];
    if (!templateConfig) return;

    await this.prisma.workflow.create({
      data: {
        name: templateConfig.name,
        description: templateConfig.description,
        projectId,
        status: 'DRAFT',
        trigger: 'MANUAL',
        steps: templateConfig.steps,
      },
    });
  }
}
