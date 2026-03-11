import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AgentType, AgentStatus } from '@prisma/client';

@ApiTags('agents')
@Controller('agents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all agents' })
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent by ID' })
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  create(@Body() body: {
    name: string;
    type: AgentType;
    description?: string;
    departmentId?: string;
    capabilities?: string[];
    config?: Record<string, any>;
  }) {
    return this.agentsService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an agent' })
  update(@Param('id') id: string, @Body() body: {
    name?: string;
    description?: string;
    status?: AgentStatus;
    capabilities?: string[];
    config?: Record<string, any>;
  }) {
    return this.agentsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an agent' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }
}
