import type { TaskDefinition, TaskFilter, TaskSort, TaskUpdate, TaskResult, TaskContext } from '../types';

/**
 * Task Manager - Handles task lifecycle and state management
 */
export class TaskManager {
  private tasks: Map<string, TaskDefinition> = new Map();

  /**
   * Create a new task
   */
  async create(data: Omit<TaskDefinition, 'id'>): Promise<TaskDefinition> {
    const task: TaskDefinition = {
      ...data,
      id: generateTaskId(),
    };

    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Get a task by ID
   */
  async get(id: string): Promise<TaskDefinition | undefined> {
    return this.tasks.get(id);
  }

  /**
   * Update a task
   */
  async update(id: string, data: TaskUpdate): Promise<TaskDefinition | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updated = { ...task, ...data };
    this.tasks.set(id, updated);
    return updated;
  }

  /**
   * Delete a task
   */
  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  /**
   * List tasks with filtering and sorting
   */
  async list(filter?: TaskFilter, sort?: TaskSort): Promise<TaskDefinition[]> {
    let tasks = Array.from(this.tasks.values());

    // Apply filters
    if (filter) {
      if (filter.projectId) {
        tasks = tasks.filter((t) => t.projectId === filter.projectId);
      }
      if (filter.status?.length) {
        tasks = tasks.filter((t) => filter.status!.includes(t.status));
      }
      if (filter.priority?.length) {
        tasks = tasks.filter((t) => filter.priority!.includes(t.priority));
      }
      if (filter.assigneeId) {
        tasks = tasks.filter((t) => t.assigneeId === filter.assigneeId);
      }
      if (filter.search) {
        const search = filter.search.toLowerCase();
        tasks = tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(search) ||
            t.description?.toLowerCase().includes(search)
        );
      }
    }

    // Apply sorting
    if (sort) {
      tasks.sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];

        if (aVal === undefined || bVal === undefined) return 0;
        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return tasks;
  }

  /**
   * Assign an agent to a task
   */
  async assignAgent(taskId: string, agentId: string, agentType?: string): Promise<TaskDefinition | undefined> {
    return this.update(taskId, {
      agentId,
      agentType: agentType as any,
      status: 'IN_PROGRESS' as any,
    });
  }

  /**
   * Complete a task
   */
  async complete(taskId: string, result: TaskResult): Promise<TaskDefinition | undefined> {
    return this.update(taskId, {
      status: 'COMPLETED' as any,
      metadata: { result },
    });
  }

  /**
   * Block a task
   */
  async block(taskId: string, reason: string): Promise<TaskDefinition | undefined> {
    return this.update(taskId, {
      status: 'BLOCKED' as any,
      metadata: { blockReason: reason },
    });
  }

  /**
   * Get task dependencies
   */
  async getDependencies(taskId: string): Promise<TaskDefinition[]> {
    const task = this.tasks.get(taskId);
    if (!task?.dependencies?.length) return [];

    const dependencies: TaskDefinition[] = [];
    for (const depId of task.dependencies) {
      const dep = this.tasks.get(depId);
      if (dep) dependencies.push(dep);
    }

    return dependencies;
  }

  /**
   * Check if task dependencies are satisfied
   */
  async areDependenciesSatisfied(taskId: string): Promise<boolean> {
    const dependencies = await this.getDependencies(taskId);
    return dependencies.every((d) => d.status === 'COMPLETED');
  }
}

function generateTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Export singleton instance
export const taskManager = new TaskManager();
