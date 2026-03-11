import type { WorkflowConfig, WorkflowContext, WorkflowResult, StepResult } from '../types';

/**
 * Workflow Engine - Orchestrates workflow execution
 */
export class WorkflowEngine {
  private executions: Map<string, WorkflowContext> = new Map();

  /**
   * Start a workflow execution
   */
  async start(config: WorkflowConfig, input: Record<string, any>): Promise<string> {
    const executionId = generateExecutionId();

    const context: WorkflowContext = {
      workflowId: config.id,
      executionId,
      projectId: input.projectId || '',
      userId: input.userId || '',
      input,
      variables: { ...config.variables },
      stepResults: new Map(),
    };

    this.executions.set(executionId, context);

    // Start async execution
    this.executeWorkflow(config, context).catch((error) => {
      console.error(`Workflow ${executionId} failed:`, error);
    });

    return executionId;
  }

  /**
   * Execute the workflow
   */
  private async executeWorkflow(
    config: WorkflowConfig,
    context: WorkflowContext
  ): Promise<WorkflowResult> {
    const stepResults: StepResult[] = [];

    // Build dependency graph
    const graph = this.buildDependencyGraph(config.steps);

    // Execute steps in topological order
    const sortedSteps = this.topologicalSort(graph);

    for (const step of sortedSteps) {
      // Check if dependencies are satisfied
      const canExecute = step.dependencies.every((depId) => {
        const result = context.stepResults.get(depId);
        return result?.status === 'completed';
      });

      if (!canExecute) {
        stepResults.push({
          stepId: step.id,
          status: 'skipped',
        });
        continue;
      }

      // Execute step
      const result = await this.executeStep(step, context);
      context.stepResults.set(step.id, result);
      stepResults.push(result);

      // Stop if step failed
      if (result.status === 'failed') {
        break;
      }
    }

    return {
      executionId: context.executionId,
      status: stepResults.some((r) => r.status === 'failed') ? 'failed' : 'completed',
      stepResults,
      startedAt: new Date(),
      completedAt: new Date(),
    };
  }

  /**
   * Execute a single step
   */
  private async executeStep(
    step: any,
    context: WorkflowContext
  ): Promise<StepResult> {
    const startTime = new Date();

    try {
      // TODO: Implement actual step execution based on type
      // For now, just return success
      return {
        stepId: step.id,
        status: 'completed',
        output: {},
        startedAt: startTime,
        completedAt: new Date(),
      };
    } catch (error) {
      return {
        stepId: step.id,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        startedAt: startTime,
        completedAt: new Date(),
      };
    }
  }

  /**
   * Build dependency graph from steps
   */
  private buildDependencyGraph(steps: any[]): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const step of steps) {
      graph.set(step.id, step.dependencies || []);
    }

    return graph;
  }

  /**
   * Topological sort of steps based on dependencies
   */
  private topologicalSort(graph: Map<string, string[]>): any[] {
    const sorted: string[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (node: string) => {
      if (visited.has(node)) return;
      if (visiting.has(node)) {
        throw new Error(`Circular dependency detected at node ${node}`);
      }

      visiting.add(node);

      const dependencies = graph.get(node) || [];
      for (const dep of dependencies) {
        visit(dep);
      }

      visiting.delete(node);
      visited.add(node);
      sorted.push(node);
    };

    for (const node of graph.keys()) {
      visit(node);
    }

    return sorted.map((id) => ({ id, dependencies: graph.get(id) || [] }));
  }

  /**
   * Get execution status
   */
  getExecution(executionId: string): WorkflowContext | undefined {
    return this.executions.get(executionId);
  }

  /**
   * Cancel an execution
   */
  async cancel(executionId: string): Promise<void> {
    const context = this.executions.get(executionId);
    if (context) {
      // TODO: Implement cancellation logic
      this.executions.delete(executionId);
    }
  }
}

function generateExecutionId(): string {
  return `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Export singleton instance
export const workflowEngine = new WorkflowEngine();
