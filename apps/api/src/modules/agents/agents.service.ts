import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AgentType, AgentStatus } from '@prisma/client';

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.agent.findMany({
      include: {
        department: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.agent.findUnique({
      where: { id },
      include: {
        department: true,
        tasks: true,
      },
    });
  }

  async create(data: {
    name: string;
    type: AgentType;
    description?: string;
    departmentId?: string;
    capabilities?: string[];
    config?: Record<string, any>;
  }) {
    return this.prisma.agent.create({
      data: {
        name: data.name,
        type: data.type,
        description: data.description,
        departmentId: data.departmentId,
        capabilities: data.capabilities || [],
        config: data.config || {},
        status: AgentStatus.IDLE,
      },
    });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    status?: AgentStatus;
    capabilities?: string[];
    config?: Record<string, any>;
  }) {
    return this.prisma.agent.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.agent.delete({
      where: { id },
    });
  }
}
