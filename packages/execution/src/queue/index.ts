import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import type { ExecutionJob } from '../types';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const QUEUE_NAME = 'execution-queue';

/**
 * Execution Queue - Manages execution job queue
 */
export class ExecutionQueue {
  private queue: Queue;
  private worker: Worker | null = null;
  private connection: IORedis;

  constructor() {
    this.connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });
    this.queue = new Queue(QUEUE_NAME, { connection: this.connection });
  }

  /**
   * Add an execution job to the queue
   */
  async addJob(job: ExecutionJob): Promise<void> {
    await this.queue.add(job.type, job.data, {
      jobId: job.id,
      priority: job.priority,
    });
  }

  /**
   * Start processing jobs
   */
  startProcessor(processor: (job: ExecutionJob) => Promise<void>): void {
    this.worker = new Worker(
      QUEUE_NAME,
      async (job) => {
        const executionJob: ExecutionJob = {
          id: job.id || '',
          executionId: job.data.executionId,
          type: job.name as ExecutionJob['type'],
          priority: job.opts.priority || 10,
          data: job.data,
        };

        await processor(executionJob);
      },
      { connection: this.connection, concurrency: 5 }
    );
  }

  /**
   * Stop processing jobs
   */
  async stopProcessor(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.worker = null;
    }
  }

  /**
   * Get queue statistics
   */
  async getStats(): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
  }> {
    const [waiting, active, completed, failed] = await Promise.all([
      this.queue.getWaitingCount(),
      this.queue.getActiveCount(),
      this.queue.getCompletedCount(),
      this.queue.getFailedCount(),
    ]);

    return { waiting, active, completed, failed };
  }

  /**
   * Clear the queue
   */
  async clear(): Promise<void> {
    await this.queue.drain();
  }

  /**
   * Close connections
   */
  async close(): Promise<void> {
    await this.stopProcessor();
    await this.queue.close();
    await this.connection.quit();
  }
}

// Export singleton instance
export const executionQueue = new ExecutionQueue();
