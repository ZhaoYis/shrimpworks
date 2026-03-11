import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { TaskPriority, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectId?: string) {
    return this.prisma.task.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        assignee: true,
        agent: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        agent: true,
        executions: true,
      },
    });
  }

  async create(data: {
    title: string;
    description?: string;
    projectId: string;
    assigneeId?: string;
    agentId?: string;
    priority?: TaskPriority;
  }) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        assigneeId: data.assigneeId,
        agentId: data.agentId,
        priority: data.priority || TaskPriority.MEDIUM,
        status: TaskStatus.PENDING,
      },
    });
  }

  async update(id: string, data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: string | null;
    agentId?: string | null;
  }) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
