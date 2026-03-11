import type { ExecutionStatus } from '@shrimpworks/core';

/**
 * Execution configuration
 */
export interface ExecutionConfig {
  id: string;
  workflowId: string;
  projectId: string;
  status: ExecutionStatus;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  timeout?: number;
  retryCount?: number;
  maxRetries?: number;
  metadata?: Record<string, any>;
}

/**
 * Execution context
 */
export interface ExecutionContext {
  executionId: string;
  workflowId: string;
  projectId: string;
  userId: string;
  input: Record<string, any>;
  state: ExecutionState;
  logs: ExecutionLog[];
}

/**
 * Execution state
 */
export interface ExecutionState {
  currentStep?: string;
  completedSteps: string[];
  failedSteps: string[];
  variables: Record<string, any>;
}

/**
 * Execution log entry
 */
export interface ExecutionLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata?: Record<string, any>;
}

/**
 * Execution result
 */
export interface ExecutionResult {
  executionId: string;
  status: ExecutionStatus;
  output?: Record<string, any>;
  error?: string;
  logs: ExecutionLog[];
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
}

/**
 * Execution filter options
 */
export interface ExecutionFilter {
  workflowId?: string;
  projectId?: string;
  status?: ExecutionStatus[];
  startedAfter?: Date;
  startedBefore?: Date;
}

/**
 * Execution queue job
 */
export interface ExecutionJob {
  id: string;
  executionId: string;
  type: 'start' | 'resume' | 'cancel' | 'retry';
  priority: number;
  data: Record<string, any>;
}
