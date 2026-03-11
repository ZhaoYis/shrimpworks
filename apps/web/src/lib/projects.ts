import { apiClient } from './api-client';

// Types
export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  template: string | null;
  orgId: string;
  departmentId: string | null;
  createdAt: string;
  updatedAt: string;
  department?: {
    id: string;
    name: string;
  } | null;
  _count?: {
    tasks: number;
    workflows: number;
  };
  taskStats?: {
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    total: number;
  };
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export interface ProjectsResponse {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProjectDetail extends Project {
  tasks: Task[];
  workflows: Workflow[];
  products: SaaSProduct[];
  org: {
    id: string;
    name: string;
    slug: string;
  };
  stats: {
    tasks: {
      byStatus: Record<string, number>;
      byPriority: Record<string, number>;
      total: number;
    };
    workflows: {
      byStatus: Record<string, number>;
      total: number;
    };
    executions: {
      byStatus: Record<string, number>;
      total: number;
      last7Days: number;
    };
  };
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  orgId: string;
  departmentId?: string;
  template?: string;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  departmentId?: string;
}

export interface QueryProjectsInput {
  orgId?: string;
  departmentId?: string;
  status?: ProjectStatus;
  search?: string;
  page?: number;
  limit?: number;
}

// API functions
export async function getProjects(params: QueryProjectsInput = {}): Promise<ProjectsResponse> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  const query = searchParams.toString();
  return apiClient.get<ProjectsResponse>(`/projects${query ? `?${query}` : ''}`);
}

export async function getProject(id: string): Promise<ProjectDetail> {
  return apiClient.get<ProjectDetail>(`/projects/${id}`);
}

export async function getProjectStats(id: string): Promise<ProjectDetail['stats']> {
  return apiClient.get<ProjectDetail['stats']>(`/projects/${id}/stats`);
}

export async function createProject(data: CreateProjectInput): Promise<Project> {
  return apiClient.post<Project>('/projects', data);
}

export async function updateProject(id: string, data: UpdateProjectInput): Promise<Project> {
  return apiClient.put<Project>(`/projects/${id}`, data);
}

export async function deleteProject(id: string): Promise<Project> {
  return apiClient.delete<Project>(`/projects/${id}`);
}

// Helper types
interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignee?: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  } | null;
  agent?: {
    id: string;
    name: string;
    type: string;
  } | null;
}

interface Workflow {
  id: string;
  name: string;
  status: string;
  trigger: string;
}

interface SaaSProduct {
  id: string;
  name: string;
  status: string;
  deploymentUrl: string | null;
}
