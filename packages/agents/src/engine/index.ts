import Anthropic from '@anthropic-ai/sdk';
import type { AgentConfig, AgentContext, AgentResult } from './types';

/**
 * Agent Engine - Core execution engine for AI agents
 */
export class AgentEngine {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  /**
   * Execute an agent with given context
   */
  async execute(
    config: AgentConfig,
    context: AgentContext
  ): Promise<AgentResult> {
    try {
      const response = await this.callLLM(config, context);

      return {
        success: true,
        output: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Call the LLM with agent configuration
   */
  private async callLLM(
    config: AgentConfig,
    context: AgentContext
  ): Promise<Record<string, any>> {
    if (!this.anthropic) {
      throw new Error('Anthropic API key not configured');
    }

    const systemPrompt = this.buildSystemPrompt(config, context);

    const message = await this.anthropic.messages.create({
      model: config.llm.model || 'claude-sonnet-4-6',
      max_tokens: config.llm.maxTokens || 4096,
      temperature: config.llm.temperature || 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: JSON.stringify(context.input),
        },
      ],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      try {
        return JSON.parse(content.text);
      } catch {
        return { text: content.text };
      }
    }

    return {};
  }

  /**
   * Build system prompt for the agent
   */
  private buildSystemPrompt(
    config: AgentConfig,
    context: AgentContext
  ): string {
    const basePrompt = config.llm.systemPrompt || `You are ${config.name}, an AI agent specialized in ${config.type}.

Capabilities: ${config.capabilities.join(', ')}

${config.description || ''}`;

    return basePrompt;
  }
}

// Export singleton instance
export const agentEngine = new AgentEngine();
