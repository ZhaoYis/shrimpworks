import type { WorkflowTrigger, WorkflowStatus } from '@shrimpworks/core';
/**
 * Workflow configuration
 */
export interface WorkflowConfig {
    id: string;
    name: string;
    description?: string;
    trigger: WorkflowTrigger;
    status: WorkflowStatus;
    steps: WorkflowStepConfig[];
    variables?: Record<string, any>;
}
/**
 * Workflow step configuration
 */
export interface WorkflowStepConfig {
    id: string;
    name: string;
    type: StepType;
    config: Record<string, any>;
    dependencies: string[];
    retryPolicy?: RetryPolicy;
    timeout?: number;
}
export type StepType = 'task' | 'agent' | 'condition' | 'parallel' | 'delay' | 'webhook' | 'subworkflow';
/**
 * Retry policy for steps
 */
export interface RetryPolicy {
    maxAttempts: number;
    backoffMs: number;
    backoffMultiplier?: number;
}
/**
 * Workflow execution context
 */
export interface WorkflowContext {
    workflowId: string;
    executionId: string;
    projectId: string;
    userId: string;
    input: Record<string, any>;
    variables: Record<string, any>;
    stepResults: Map<string, StepResult>;
}
/**
 * Step execution result
 */
export interface StepResult {
    stepId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    output?: Record<string, any>;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
}
/**
 * Workflow execution result
 */
export interface WorkflowResult {
    executionId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    output?: Record<string, any>;
    error?: string;
    stepResults: StepResult[];
    startedAt: Date;
    completedAt?: Date;
}
//# sourceMappingURL=index.d.ts.map