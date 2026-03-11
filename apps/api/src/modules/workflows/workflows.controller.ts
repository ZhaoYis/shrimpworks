import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkflowTrigger, WorkflowStatus } from '@prisma/client';

@ApiTags('workflows')
@Controller('workflows')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workflows' })
  findAll(@Query('projectId') projectId?: string) {
    return this.workflowsService.findAll(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow by ID' })
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new workflow' })
  create(@Body() body: {
    name: string;
    description?: string;
    projectId: string;
    trigger?: WorkflowTrigger;
    steps?: any[];
  }) {
    return this.workflowsService.create(body);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Execute a workflow' })
  execute(@Param('id') id: string, @Body() body?: { input?: Record<string, any> }) {
    return this.workflowsService.execute(id, body?.input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a workflow' })
  update(@Param('id') id: string, @Body() body: {
    name?: string;
    description?: string;
    status?: WorkflowStatus;
    trigger?: WorkflowTrigger;
    steps?: any[];
  }) {
    return this.workflowsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow' })
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(id);
  }
}
