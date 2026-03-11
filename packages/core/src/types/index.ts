/**
 * Common types used across ShrimpWorks
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
}

export type UserRole = 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface Project extends BaseEntity {
  name: string;
  description?: string;
  status: ProjectStatus;
  orgId: string;
  departmentId?: string;
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  agentId?: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'REVIEW' | 'COMPLETED' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Agent extends BaseEntity {
  name: string;
  type: AgentType;
  description?: string;
  status: AgentStatus;
  capabilities: string[];
  config: Record<string, any>;
  departmentId?: string;
}

export type AgentType =
  | 'PROJECT_MANAGER'
  | 'PRODUCT_MANAGER'
  | 'SCRUM_MASTER'
  | 'ARCHITECT'
  | 'FRONTEND_DEVELOPER'
  | 'BACKEND_DEVELOPER'
  | 'FULL_STACK_DEVELOPER'
  | 'DEVOPS_ENGINEER'
  | 'QA_ENGINEER'
  | 'DATA_ENGINEER'
  | 'DATA_SCIENTIST'
  | 'AI_ML_ENGINEER'
  | 'UI_UX_DESIGNER'
  | 'TECHNICAL_WRITER'
  | 'SECURITY_ENGINEER'
  | 'SRE'
  | 'CODE_REVIEWER'
  | 'PROMPT_ENGINEER';

export type AgentStatus = 'IDLE' | 'BUSY' | 'ERROR' | 'OFFLINE';

export interface Workflow extends BaseEntity {
  name: string;
  description?: string;
  status: WorkflowStatus;
  projectId: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
}

export type WorkflowStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
export type WorkflowTrigger = 'MANUAL' | 'SCHEDULED' | 'EVENT' | 'WEBHOOK';

export interface WorkflowStep {
  id: string;
  name: string;
  type: StepType;
  config: Record<string, any>;
  dependencies: string[];
}

export type StepType = 'TASK' | 'AGENT' | 'CONDITION' | 'PARALLEL' | 'DELAY' | 'WEBHOOK';

export interface Execution extends BaseEntity {
  workflowId: string;
  status: ExecutionStatus;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
}

export type ExecutionStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface Org extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  settings?: Record<string, any>;
}

export interface Department extends BaseEntity {
  name: string;
  description?: string;
  orgId: string;
}

export interface SaaSProduct extends BaseEntity {
  name: string;
  description?: string;
  projectId: string;
  status: SaaSProductStatus;
  config: Record<string, any>;
  deploymentUrl?: string;
}

export type SaaSProductStatus = 'PLANNING' | 'DEVELOPMENT' | 'TESTING' | 'DEPLOYED' | 'MAINTENANCE';
