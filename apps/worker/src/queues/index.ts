/**
 * Queue Names
 */
export const QUEUE_NAMES = {
  TASK: 'task-queue',
  AGENT: 'agent-queue',
  WORKFLOW: 'workflow-queue',
  EXECUTION: 'execution-queue',
  NOTIFICATION: 'notification-queue',
} as const;

/**
 * Job Types
 */
export const JOB_TYPES = {
  // Task jobs
  CREATE_TASK: 'create-task',
  UPDATE_TASK: 'update-task',
  ASSIGN_AGENT: 'assign-agent',
  COMPLETE_TASK: 'complete-task',

  // Agent jobs
  RUN_AGENT: 'run-agent',
  CONFIGURE_AGENT: 'configure-agent',
  STOP_AGENT: 'stop-agent',

  // Workflow jobs
  EXECUTE_WORKFLOW: 'execute-workflow',
  PAUSE_WORKFLOW: 'pause-workflow',
  RESUME_WORKFLOW: 'resume-workflow',

  // Execution jobs
  RUN_EXECUTION: 'run-execution',
  CANCEL_EXECUTION: 'cancel-execution',

  // Notification jobs
  SEND_NOTIFICATION: 'send-notification',
  SEND_EMAIL: 'send-email',
} as const;
