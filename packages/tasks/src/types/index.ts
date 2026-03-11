import type { TaskStatus, TaskPriority, AgentType } from '@shrimpworks/core';

/**
 * Task definition
 */
export interface TaskDefinition {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  agentId?: string;
  agentType?: AgentType;
  dependencies?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
}

/**
 * Task execution context
 */
export interface TaskContext {
  taskId: string;
  projectId: string;
  userId: string;
  agentId?: string;
  input: Record<string, any>;
  parentTaskId?: string;
  metadata?: Record<string, any>;
}

/**
 * Task execution result
 */
export interface TaskResult {
  taskId: string;
  status: 'success' | 'failure' | 'partial';
  output?: Record<string, any>;
  error?: string;
  artifacts?: TaskArtifact[];
  subtasks?: string[];
  completedAt: Date;
}

/**
 * Task artifact
 */
export interface TaskArtifact {
  type: 'file' | 'code' | 'document' | 'image' | 'other';
  name: string;
  path?: string;
  content?: string;
  url?: string;
}

/**
 * Task filter options
 */
export interface TaskFilter {
  projectId?: string;
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeId?: string;
  agentType?: AgentType;
  tags?: string[];
  search?: string;
  dueBefore?: Date;
  dueAfter?: Date;
}

/**
 * Task sort options
 */
export interface TaskSort {
  field: 'createdAt' | 'updatedAt' | 'priority' | 'dueDate' | 'title';
  direction: 'asc' | 'desc';
}

/**
 * Task update options
 */
export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  agentId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
}
