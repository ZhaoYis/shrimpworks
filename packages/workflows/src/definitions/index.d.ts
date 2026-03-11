import type { WorkflowConfig } from '../types';
/**
 * Predefined workflow templates
 */
export declare const WORKFLOW_TEMPLATES: Record<string, Partial<WorkflowConfig>>;
/**
 * Get workflow template by name
 */
export declare function getWorkflowTemplate(name: string): Partial<WorkflowConfig> | undefined;
/**
 * Get all workflow template names
 */
export declare function getWorkflowTemplateNames(): string[];
//# sourceMappingURL=index.d.ts.map