import type { AgentType } from '@shrimpworks/core';
import type { AgentConfig } from '../types';

/**
 * Agent Definitions - Predefined configurations for all 18 AI agents
 */

export const AGENT_DEFINITIONS: Record<AgentType, Omit<AgentConfig, 'id'>> = {
  // Project Management Agents
  PROJECT_MANAGER: {
    name: 'Project Manager',
    type: 'PROJECT_MANAGER',
    description: 'Oversees project planning, resource allocation, and timeline management',
    capabilities: ['planning', 'coordination', 'timeline', 'resource_management', 'risk_assessment'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Project Manager AI. You help plan, coordinate, and track project progress. You create timelines, allocate resources, and identify risks early.`,
    },
  },

  PRODUCT_MANAGER: {
    name: 'Product Manager',
    type: 'PRODUCT_MANAGER',
    description: 'Manages product requirements, roadmap, and feature prioritization',
    capabilities: ['requirements', 'roadmap', 'prioritization', 'user_stories', 'market_analysis'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Product Manager AI. You help define product vision, create requirements, and prioritize features based on user needs and business goals.`,
    },
  },

  SCRUM_MASTER: {
    name: 'Scrum Master',
    type: 'SCRUM_MASTER',
    description: 'Facilitates agile processes, sprint planning, and team velocity tracking',
    capabilities: ['sprint_planning', 'standup', 'retrospective', 'velocity', 'backlog_management'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Scrum Master AI. You facilitate agile ceremonies, help with sprint planning, and ensure the team follows Scrum best practices.`,
    },
  },

  // Development Agents
  ARCHITECT: {
    name: 'Architect',
    type: 'ARCHITECT',
    description: 'Designs system architecture, tech stack decisions, and scalability plans',
    capabilities: ['system_design', 'architecture', 'tech_stack', 'scalability', 'patterns'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Software Architect AI. You design scalable, maintainable system architectures and make informed technology decisions.`,
    },
  },

  FRONTEND_DEVELOPER: {
    name: 'Frontend Developer',
    type: 'FRONTEND_DEVELOPER',
    description: 'Implements UI components, handles styling, and ensures responsive design',
    capabilities: ['react', 'vue', 'angular', 'css', 'ui_components', 'responsive_design'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Frontend Developer AI. You write clean, efficient, and accessible frontend code using modern frameworks and best practices.`,
    },
  },

  BACKEND_DEVELOPER: {
    name: 'Backend Developer',
    type: 'BACKEND_DEVELOPER',
    description: 'Implements API endpoints, database interactions, and business logic',
    capabilities: ['api', 'database', 'microservices', 'authentication', 'business_logic'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Backend Developer AI. You design and implement robust APIs, manage database interactions, and write efficient server-side code.`,
    },
  },

  FULL_STACK_DEVELOPER: {
    name: 'Full Stack Developer',
    type: 'FULL_STACK_DEVELOPER',
    description: 'Handles end-to-end feature implementation across frontend and backend',
    capabilities: ['frontend', 'backend', 'database', 'deployment', 'full_feature'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Full Stack Developer AI. You can implement complete features from database to UI, ensuring consistency across the entire stack.`,
    },
  },

  DEVOPS_ENGINEER: {
    name: 'DevOps Engineer',
    type: 'DEVOPS_ENGINEER',
    description: 'Manages CI/CD pipelines, infrastructure, and deployment automation',
    capabilities: ['ci_cd', 'docker', 'kubernetes', 'infrastructure', 'monitoring'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced DevOps Engineer AI. You design and implement CI/CD pipelines, manage infrastructure, and ensure reliable deployments.`,
    },
  },

  QA_ENGINEER: {
    name: 'QA Engineer',
    type: 'QA_ENGINEER',
    description: 'Creates test plans, automates testing, and ensures quality standards',
    capabilities: ['testing', 'automation', 'quality', 'test_plans', 'bug_tracking'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced QA Engineer AI. You create comprehensive test plans, write automated tests, and ensure software quality.`,
    },
  },

  // Data & AI Agents
  DATA_ENGINEER: {
    name: 'Data Engineer',
    type: 'DATA_ENGINEER',
    description: 'Designs data pipelines, ETL processes, and data infrastructure',
    capabilities: ['etl', 'pipelines', 'data_warehouse', 'sql', 'data_quality'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Data Engineer AI. You design and implement data pipelines, manage ETL processes, and ensure data quality.`,
    },
  },

  DATA_SCIENTIST: {
    name: 'Data Scientist',
    type: 'DATA_SCIENTIST',
    description: 'Performs analytics, builds models, and generates insights',
    capabilities: ['analytics', 'ml_models', 'statistics', 'visualization', 'insights'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Data Scientist AI. You analyze data, build predictive models, and generate actionable insights.`,
    },
  },

  AI_ML_ENGINEER: {
    name: 'AI/ML Engineer',
    type: 'AI_ML_ENGINEER',
    description: 'Develops and deploys machine learning models and AI systems',
    capabilities: ['machine_learning', 'deep_learning', 'nlp', 'computer_vision', 'model_deployment'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced AI/ML Engineer AI. You develop, train, and deploy machine learning models for various applications.`,
    },
  },

  // Design & UX Agents
  UI_UX_DESIGNER: {
    name: 'UI/UX Designer',
    type: 'UI_UX_DESIGNER',
    description: 'Creates user-centered designs, wireframes, and prototypes',
    capabilities: ['wireframes', 'prototypes', 'user_research', 'accessibility', 'design_systems'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced UI/UX Designer AI. You create user-centered designs, wireframes, and prototypes that balance aesthetics with usability.`,
    },
  },

  TECHNICAL_WRITER: {
    name: 'Technical Writer',
    type: 'TECHNICAL_WRITER',
    description: 'Creates documentation, API docs, and user guides',
    capabilities: ['documentation', 'api_docs', 'tutorials', 'guides', 'knowledge_base'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Technical Writer AI. You create clear, comprehensive documentation for technical and non-technical audiences.`,
    },
  },

  // Security & Operations Agents
  SECURITY_ENGINEER: {
    name: 'Security Engineer',
    type: 'SECURITY_ENGINEER',
    description: 'Performs security audits, vulnerability assessments, and compliance checks',
    capabilities: ['security_audit', 'penetration_testing', 'compliance', 'encryption', 'threat_modeling'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Security Engineer AI. You perform security audits, identify vulnerabilities, and ensure compliance with security standards.`,
    },
  },

  SRE: {
    name: 'Site Reliability Engineer',
    type: 'SRE',
    description: 'Ensures system reliability, monitoring, and incident response',
    capabilities: ['monitoring', 'incident_response', 'reliability', 'performance', 'slos'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Site Reliability Engineer AI. You ensure system reliability, set up monitoring, and respond to incidents.`,
    },
  },

  // Specialized Agents
  CODE_REVIEWER: {
    name: 'Code Reviewer',
    type: 'CODE_REVIEWER',
    description: 'Reviews code for quality, best practices, and potential issues',
    capabilities: ['code_quality', 'best_practices', 'refactoring', 'review', 'patterns'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Code Reviewer AI. You review code for quality, suggest improvements, and ensure adherence to best practices.`,
    },
  },

  PROMPT_ENGINEER: {
    name: 'Prompt Engineer',
    type: 'PROMPT_ENGINEER',
    description: 'Designs and optimizes prompts for AI models',
    capabilities: ['prompt_design', 'optimization', 'llm', 'evaluation', 'few_shot'],
    llm: {
      provider: 'anthropic',
      model: 'claude-sonnet-4-6',
      temperature: 0.7,
      systemPrompt: `You are an experienced Prompt Engineer AI. You design effective prompts for LLMs, optimize for performance, and evaluate results.`,
    },
  },
};

/**
 * Get agent configuration by type
 */
export function getAgentConfig(type: AgentType): Omit<AgentConfig, 'id'> | undefined {
  return AGENT_DEFINITIONS[type];
}

/**
 * Get all agent types
 */
export function getAllAgentTypes(): AgentType[] {
  return Object.keys(AGENT_DEFINITIONS) as AgentType[];
}
