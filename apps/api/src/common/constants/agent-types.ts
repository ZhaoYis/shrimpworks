/**
 * Agent Types - 18 specialized AI agents
 */

export const AGENT_TYPES = {
  // Project Management
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  PRODUCT_MANAGER: 'PRODUCT_MANAGER',
  SCRUM_MASTER: 'SCRUM_MASTER',

  // Development
  ARCHITECT: 'ARCHITECT',
  FRONTEND_DEVELOPER: 'FRONTEND_DEVELOPER',
  BACKEND_DEVELOPER: 'BACKEND_DEVELOPER',
  FULL_STACK_DEVELOPER: 'FULL_STACK_DEVELOPER',
  DEVOPS_ENGINEER: 'DEVOPS_ENGINEER',
  QA_ENGINEER: 'QA_ENGINEER',

  // Data & AI
  DATA_ENGINEER: 'DATA_ENGINEER',
  DATA_SCIENTIST: 'DATA_SCIENTIST',
  AI_ML_ENGINEER: 'AI_ML_ENGINEER',

  // Design & UX
  UI_UX_DESIGNER: 'UI_UX_DESIGNER',
  TECHNICAL_WRITER: 'TECHNICAL_WRITER',

  // Security & Operations
  SECURITY_ENGINEER: 'SECURITY_ENGINEER',
  SRE: 'SRE',

  // Specialized
  CODE_REVIEWER: 'CODE_REVIEWER',
  PROMPT_ENGINEER: 'PROMPT_ENGINEER',
} as const;

export type AgentType = (typeof AGENT_TYPES)[keyof typeof AGENT_TYPES];

export const AGENT_CAPABILITIES: Record<AgentType, string[]> = {
  PROJECT_MANAGER: ['planning', 'coordination', 'timeline', 'resource_management'],
  PRODUCT_MANAGER: ['requirements', 'roadmap', 'prioritization', 'user_stories'],
  SCRUM_MASTER: ['sprint_planning', 'standup', 'retrospective', 'velocity'],

  ARCHITECT: ['system_design', 'architecture', 'tech_stack', 'scalability'],
  FRONTEND_DEVELOPER: ['react', 'vue', 'angular', 'css', 'ui_components'],
  BACKEND_DEVELOPER: ['api', 'database', 'microservices', 'authentication'],
  FULL_STACK_DEVELOPER: ['frontend', 'backend', 'database', 'deployment'],
  DEVOPS_ENGINEER: ['ci_cd', 'docker', 'kubernetes', 'infrastructure'],
  QA_ENGINEER: ['testing', 'automation', 'quality', 'test_plans'],

  DATA_ENGINEER: ['etl', 'pipelines', 'data_warehouse', 'sql'],
  DATA_SCIENTIST: ['analytics', 'ml_models', 'statistics', 'visualization'],
  AI_ML_ENGINEER: ['machine_learning', 'deep_learning', 'nlp', 'computer_vision'],

  UI_UX_DESIGNER: ['wireframes', 'prototypes', 'user_research', 'accessibility'],
  TECHNICAL_WRITER: ['documentation', 'api_docs', 'tutorials', 'guides'],

  SECURITY_ENGINEER: ['security_audit', 'penetration_testing', 'compliance', 'encryption'],
  SRE: ['monitoring', 'incident_response', 'reliability', 'performance'],

  CODE_REVIEWER: ['code_quality', 'best_practices', 'refactoring', 'review'],
  PROMPT_ENGINEER: ['prompt_design', 'optimization', 'llm', 'evaluation'],
};
