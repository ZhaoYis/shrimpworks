import type { TaskDefinition } from '../types';

/**
 * Task Scheduler - Manages task scheduling and prioritization
 */
export class TaskScheduler {
  private queue: TaskDefinition[] = [];
  private processing: Map<string, TaskDefinition> = new Map();

  /**
   * Add a task to the queue
   */
  enqueue(task: TaskDefinition): void {
    // Insert based on priority
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    const taskPriority = priorityOrder[task.priority] ?? 2;

    let inserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      const queuePriority = priorityOrder[this.queue[i].priority] ?? 2;
      if (taskPriority < queuePriority) {
        this.queue.splice(i, 0, task);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      this.queue.push(task);
    }
  }

  /**
   * Get the next task to process
   */
  dequeue(): TaskDefinition | undefined {
    const task = this.queue.shift();
    if (task) {
      this.processing.set(task.id, task);
    }
    return task;
  }

  /**
   * Mark a task as completed
   */
  complete(taskId: string): void {
    this.processing.delete(taskId);
  }

  /**
   * Get queue length
   */
  get queueLength(): number {
    return this.queue.length;
  }

  /**
   * Get processing count
   */
  get processingCount(): number {
    return this.processing.size;
  }

  /**
   * Get all queued tasks
   */
  getQueuedTasks(): TaskDefinition[] {
    return [...this.queue];
  }

  /**
   * Get all processing tasks
   */
  getProcessingTasks(): TaskDefinition[] {
    return Array.from(this.processing.values());
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.queue = [];
    this.processing.clear();
  }

  /**
   * Reorder tasks by priority
   */
  reorder(): void {
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    this.queue.sort((a, b) => {
      const aPriority = priorityOrder[a.priority] ?? 2;
      const bPriority = priorityOrder[b.priority] ?? 2;
      return aPriority - bPriority;
    });
  }
}

// Export singleton instance
export const taskScheduler = new TaskScheduler();
