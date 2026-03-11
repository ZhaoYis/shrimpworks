import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrgService } from './org.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@ApiTags('organizations')
@Controller('org')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrgController {
  constructor(private readonly orgService: OrgService) {}

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  findAll() {
    return this.orgService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  findOne(@Param('id') id: string) {
    return this.orgService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  create(@Body() body: {
    name: string;
    slug: string;
    description?: string;
  }) {
    return this.orgService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization' })
  update(@Param('id') id: string, @Body() body: Partial<{
    name: string;
    description: string;
    settings: Record<string, any>;
  }>) {
    return this.orgService.update(id, body);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Add user to organization' })
  addUser(@Param('id') id: string, @Body() body: { userId: string; role?: UserRole }) {
    return this.orgService.addUser(id, body.userId, body.role);
  }

  @Post(':id/departments')
  @ApiOperation({ summary: 'Create a department in organization' })
  createDepartment(@Param('id') id: string, @Body() body: {
    name: string;
    description?: string;
  }) {
    return this.orgService.createDepartment(id, body);
  }
}
