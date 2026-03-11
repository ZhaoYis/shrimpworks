import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class OrgService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: string) {
    return this.prisma.org.findMany({
      where: userId ? { users: { some: { userId } } } : undefined,
      include: {
        _count: {
          select: {
            users: true,
            departments: true,
            projects: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const org = await this.prisma.org.findUnique({
      where: { id },
      include: {
        departments: {
          include: {
            _count: {
              select: { agents: true, projects: true },
            },
          },
        },
      },
    });

    if (!org) return null;

    // Get users separately through UserOrg relation
    const userOrgs = await this.prisma.userOrg.findMany({
      where: { orgId: id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      ...org,
      users: userOrgs.map((uo) => ({
        ...uo.user,
        role: uo.role,
      })),
    };
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string;
  }) {
    return this.prisma.org.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
      },
    });
  }

  async update(id: string, data: Partial<{
    name: string;
    description: string;
    settings: Record<string, any>;
  }>) {
    return this.prisma.org.update({
      where: { id },
      data,
    });
  }

  async addUser(orgId: string, userId: string, role?: UserRole) {
    return this.prisma.userOrg.create({
      data: {
        orgId,
        userId,
        role: role || UserRole.MEMBER,
      },
    });
  }

  async createDepartment(orgId: string, data: {
    name: string;
    description?: string;
  }) {
    return this.prisma.department.create({
      data: {
        name: data.name,
        description: data.description,
        orgId: orgId,
      },
    });
  }
}
