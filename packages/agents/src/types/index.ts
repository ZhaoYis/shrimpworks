import type { AgentType } from '@shrimpworks/core';

/**
 * Agent configuration
 */
export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  description?: string;
  capabilities: string[];
  llm: LLMConfig;
  tools?: ToolConfig[];
  memory?: MemoryConfig;
}

/**
 * LLM configuration
 */
export interface LLMConfig {
  provider: 'anthropic' | 'openai';
  model: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

/**
 * Tool configuration
 */
export interface ToolConfig {
  name: string;
  description: string;
  parameters: Record<string, any>;
  handler: string;
}

/**
 * Memory configuration
 */
export interface MemoryConfig {
  enabled: boolean;
  type: 'short_term' | 'long_term' | 'hybrid';
  maxItems?: number;
}

/**
 * Agent execution context
 */
export interface AgentContext {
  taskId: string;
  projectId: string;
  userId: string;
  input: Record<string, any>;
  memory?: Record<string, any>[];
  metadata?: Record<string, any>;
}

/**
 * Agent execution result
 */
export interface AgentResult {
  success: boolean;
  output?: Record<string, any>;
  error?: string;
  artifacts?: Artifact[];
  nextSteps?: string[];
}

/**
 * Generated artifact
 */
export interface Artifact {
  type: 'code' | 'document' | 'diagram' | 'config' | 'other';
  name: string;
  content: string;
  language?: string;
}

/**
 * Agent state
 */
export interface AgentState {
  id: string;
  status: 'idle' | 'running' | 'paused' | 'error';
  currentTask?: string;
  lastActivity?: Date;
  errorCount: number;
}
