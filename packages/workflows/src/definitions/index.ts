import type { WorkflowConfig } from '../types';

/**
 * Predefined workflow templates
 */

export const WORKFLOW_TEMPLATES: Record<string, Partial<WorkflowConfig>> = {
  // SaaS Product Generation Workflow
  SAAS_PRODUCT_GENERATION: {
    name: 'SaaS Product Generation',
    description: 'Complete workflow to generate a SaaS product from requirements',
    trigger: 'MANUAL',
    steps: [
      {
        id: 'requirements-analysis',
        name: 'Requirements Analysis',
        type: 'agent',
        config: { agentType: 'PRODUCT_MANAGER' },
        dependencies: [],
      },
      {
        id: 'architecture-design',
        name: 'Architecture Design',
        type: 'agent',
        config: { agentType: 'ARCHITECT' },
        dependencies: ['requirements-analysis'],
      },
      {
        id: 'database-design',
        name: 'Database Design',
        type: 'agent',
        config: { agentType: 'BACKEND_DEVELOPER' },
        dependencies: ['architecture-design'],
      },
      {
        id: 'api-development',
        name: 'API Development',
        type: 'agent',
        config: { agentType: 'BACKEND_DEVELOPER' },
        dependencies: ['database-design'],
      },
      {
        id: 'frontend-development',
        name: 'Frontend Development',
        type: 'agent',
        config: { agentType: 'FRONTEND_DEVELOPER' },
        dependencies: ['api-development'],
      },
      {
        id: 'code-review',
        name: 'Code Review',
        type: 'agent',
        config: { agentType: 'CODE_REVIEWER' },
        dependencies: ['frontend-development', 'api-development'],
      },
      {
        id: 'testing',
        name: 'Testing',
        type: 'agent',
        config: { agentType: 'QA_ENGINEER' },
        dependencies: ['code-review'],
      },
      {
        id: 'documentation',
        name: 'Documentation',
        type: 'agent',
        config: { agentType: 'TECHNICAL_WRITER' },
        dependencies: ['testing'],
      },
      {
        id: 'deployment',
        name: 'Deployment',
        type: 'agent',
        config: { agentType: 'DEVOPS_ENGINEER' },
        dependencies: ['documentation'],
      },
    ],
  },

  // Feature Implementation Workflow
  FEATURE_IMPLEMENTATION: {
    name: 'Feature Implementation',
    description: 'Workflow to implement a new feature',
    trigger: 'MANUAL',
    steps: [
      {
        id: 'feature-spec',
        name: 'Feature Specification',
        type: 'agent',
        config: { agentType: 'PRODUCT_MANAGER' },
        dependencies: [],
      },
      {
        id: 'design-review',
        name: 'Design Review',
        type: 'agent',
        config: { agentType: 'UI_UX_DESIGNER' },
        dependencies: ['feature-spec'],
      },
      {
        id: 'implementation',
        name: 'Implementation',
        type: 'agent',
        config: { agentType: 'FULL_STACK_DEVELOPER' },
        dependencies: ['design-review'],
      },
      {
        id: 'testing',
        name: 'Testing',
        type: 'agent',
        config: { agentType: 'QA_ENGINEER' },
        dependencies: ['implementation'],
      },
    ],
  },

  // Bug Fix Workflow
  BUG_FIX: {
    name: 'Bug Fix',
    description: 'Workflow to analyze and fix a bug',
    trigger: 'MANUAL',
    steps: [
      {
        id: 'bug-analysis',
        name: 'Bug Analysis',
        type: 'agent',
        config: { agentType: 'BACKEND_DEVELOPER' },
        dependencies: [],
      },
      {
        id: 'fix-implementation',
        name: 'Fix Implementation',
        type: 'agent',
        config: { agentType: 'FULL_STACK_DEVELOPER' },
        dependencies: ['bug-analysis'],
      },
      {
        id: 'code-review',
        name: 'Code Review',
        type: 'agent',
        config: { agentType: 'CODE_REVIEWER' },
        dependencies: ['fix-implementation'],
      },
      {
        id: 'verification',
        name: 'Verification',
        type: 'agent',
        config: { agentType: 'QA_ENGINEER' },
        dependencies: ['code-review'],
      },
    ],
  },

  // Code Review Workflow
  CODE_REVIEW: {
    name: 'Code Review',
    description: 'Comprehensive code review workflow',
    trigger: 'MANUAL',
    steps: [
      {
        id: 'review',
        name: 'Code Review',
        type: 'agent',
        config: { agentType: 'CODE_REVIEWER' },
        dependencies: [],
      },
      {
        id: 'security-check',
        name: 'Security Check',
        type: 'agent',
        config: { agentType: 'SECURITY_ENGINEER' },
        dependencies: ['review'],
      },
    ],
  },

  // Deployment Workflow
  DEPLOYMENT: {
    name: 'Deployment',
    description: 'Safe deployment workflow',
    trigger: 'MANUAL',
    steps: [
      {
        id: 'pre-deploy-check',
        name: 'Pre-deployment Check',
        type: 'agent',
        config: { agentType: 'DEVOPS_ENGINEER' },
        dependencies: [],
      },
      {
        id: 'deploy',
        name: 'Deploy',
        type: 'agent',
        config: { agentType: 'DEVOPS_ENGINEER' },
        dependencies: ['pre-deploy-check'],
      },
      {
        id: 'health-check',
        name: 'Health Check',
        type: 'agent',
        config: { agentType: 'SRE' },
        dependencies: ['deploy'],
      },
    ],
  },
};

/**
 * Get workflow template by name
 */
export function getWorkflowTemplate(name: string): Partial<WorkflowConfig> | undefined {
  return WORKFLOW_TEMPLATES[name];
}

/**
 * Get all workflow template names
 */
export function getWorkflowTemplateNames(): string[] {
  return Object.keys(WORKFLOW_TEMPLATES);
}
