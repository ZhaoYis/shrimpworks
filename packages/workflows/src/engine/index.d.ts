import type { WorkflowConfig, WorkflowContext } from '../types';
/**
 * Workflow Engine - Orchestrates workflow execution
 */
export declare class WorkflowEngine {
    private executions;
    /**
     * Start a workflow execution
     */
    start(config: WorkflowConfig, input: Record<string, any>): Promise<string>;
    /**
     * Execute the workflow
     */
    private executeWorkflow;
    /**
     * Execute a single step
     */
    private executeStep;
    /**
     * Build dependency graph from steps
     */
    private buildDependencyGraph;
    /**
     * Topological sort of steps based on dependencies
     */
    private topologicalSort;
    /**
     * Get execution status
     */
    getExecution(executionId: string): WorkflowContext | undefined;
    /**
     * Cancel an execution
     */
    cancel(executionId: string): Promise<void>;
}
export declare const workflowEngine: WorkflowEngine;
//# sourceMappingURL=index.d.ts.map