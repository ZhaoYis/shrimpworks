import type { ExecutionConfig, ExecutionContext, ExecutionResult, ExecutionState, ExecutionLog } from '../types';
import { workflowEngine } from '@shrimpworks/workflows';

/**
 * Execution Engine - Manages execution lifecycle
 */
export class ExecutionEngine {
  private executions: Map<string, ExecutionContext> = new Map();

  /**
   * Start a new execution
   */
  async start(config: ExecutionConfig): Promise<string> {
    const context: ExecutionContext = {
      executionId: config.id,
      workflowId: config.workflowId,
      projectId: config.projectId,
      userId: config.metadata?.userId || '',
      input: config.input,
      state: {
        completedSteps: [],
        failedSteps: [],
        variables: {},
      },
      logs: [],
    };

    this.executions.set(config.id, context);
    this.log(context, 'info', `Execution started: ${config.id}`);

    // Start workflow execution
    try {
      await workflowEngine.start(
        {
          id: config.workflowId,
          name: '',
          trigger: 'MANUAL',
          status: 'ACTIVE',
          steps: [],
        },
        config.input
      );

      this.log(context, 'info', 'Workflow started successfully');
    } catch (error) {
      this.log(context, 'error', `Failed to start workflow: ${error}`);
      throw error;
    }

    return config.id;
  }

  /**
   * Get execution status
   */
  async getStatus(executionId: string): Promise<ExecutionContext | undefined> {
    return this.executions.get(executionId);
  }

  /**
   * Cancel an execution
   */
  async cancel(executionId: string): Promise<void> {
    const context = this.executions.get(executionId);
    if (!context) return;

    this.log(context, 'info', 'Execution cancelled');

    await workflowEngine.cancel(executionId);
    this.executions.delete(executionId);
  }

  /**
   * Retry a failed execution
   */
  async retry(executionId: string): Promise<string> {
    const context = this.executions.get(executionId);
    if (!context) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    // Reset state
    context.state = {
      completedSteps: [],
      failedSteps: [],
      variables: {},
    };

    this.log(context, 'info', 'Execution retry started');

    // Re-execute
    return this.start({
      id: executionId,
      workflowId: context.workflowId,
      projectId: context.projectId,
      status: 'PENDING',
      input: context.input,
    });
  }

  /**
   * Get execution logs
   */
  getLogs(executionId: string): ExecutionLog[] {
    const context = this.executions.get(executionId);
    return context?.logs || [];
  }

  /**
   * Add log entry
   */
  private log(
    context: ExecutionContext,
    level: ExecutionLog['level'],
    message: string,
    metadata?: Record<string, any>
  ): void {
    context.logs.push({
      timestamp: new Date(),
      level,
      message,
      metadata,
    });
  }

  /**
   * List executions with filtering
   */
  async list(filter?: {
    workflowId?: string;
    projectId?: string;
    status?: string[];
  }): Promise<ExecutionContext[]> {
    let executions = Array.from(this.executions.values());

    if (filter) {
      if (filter.workflowId) {
        executions = executions.filter((e) => e.workflowId === filter.workflowId);
      }
      if (filter.projectId) {
        executions = executions.filter((e) => e.projectId === filter.projectId);
      }
    }

    return executions;
  }
}

// Export singleton instance
export const executionEngine = new ExecutionEngine();
