import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { WorkflowStatus, WorkflowTrigger, ExecutionStatus } from '@prisma/client';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectId?: string) {
    return this.prisma.workflow.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        project: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.workflow.findUnique({
      where: { id },
      include: {
        project: true,
        executions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async create(data: {
    name: string;
    description?: string;
    projectId: string;
    trigger?: WorkflowTrigger;
    steps?: any[];
  }) {
    return this.prisma.workflow.create({
      data: {
        name: data.name,
        description: data.description,
        projectId: data.projectId,
        trigger: data.trigger || WorkflowTrigger.MANUAL,
        steps: data.steps || [],
        status: WorkflowStatus.DRAFT,
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    status?: WorkflowStatus;
    trigger?: WorkflowTrigger;
    steps?: any[];
  }) {
    return this.prisma.workflow.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.workflow.delete({
      where: { id },
    });
  }

  async execute(id: string, input?: Record<string, any>) {
    // Create an execution record
    const execution = await this.prisma.execution.create({
      data: {
        workflowId: id,
        status: ExecutionStatus.PENDING,
        input: input || {},
      },
    });

    // TODO: Queue the workflow execution
    return execution;
  }
}
