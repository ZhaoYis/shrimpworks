'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProject } from '@/hooks/use-projects';
import type { ProjectStatus } from '@/lib/projects';

const statusColors: Record<ProjectStatus, string> = {
  PLANNING: 'secondary',
  ACTIVE: 'default',
  PAUSED: 'outline',
  COMPLETED: 'default',
  ARCHIVED: 'outline',
} as const;

const statusLabels: Record<ProjectStatus, string> = {
  PLANNING: 'Planning',
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-destructive">Project not found</p>
        <Button variant="outline" onClick={() => router.push('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  const progress = project.stats.tasks.total > 0
    ? Math.round(
        ((project.stats.tasks.byStatus.COMPLETED || 0) /
          project.stats.tasks.total) *
          100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/projects')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h2>
              <Badge variant={statusColors[project.status] as any}>
                {statusLabels[project.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {project.description || 'No description'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            Start Workflow
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tasks</CardDescription>
            <CardTitle className="text-3xl">
              {project.stats.tasks.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {progress}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Workflows</CardDescription>
            <CardTitle className="text-3xl">
              {project.stats.workflows.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {project.stats.workflows.byStatus.ACTIVE || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Executions</CardDescription>
            <CardTitle className="text-3xl">
              {project.stats.executions.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {project.stats.executions.last7Days} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products</CardDescription>
            <CardTitle className="text-3xl">
              {project.products?.length || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              SaaS products generated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          {project.tasks && project.tasks.length > 0 ? (
            <div className="grid gap-2">
              {project.tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-sm">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {task.assignee?.name || task.agent?.name || 'Unassigned'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{task.status}</Badge>
                      <Badge variant="secondary">{task.priority}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No tasks yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          {project.workflows && project.workflows.length > 0 ? (
            <div className="grid gap-2">
              {project.workflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-sm">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{workflow.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Trigger: {workflow.trigger}
                      </p>
                    </div>
                    <Badge variant={workflow.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No workflows yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          {project.products && project.products.length > 0 ? (
            <div className="grid gap-2">
              {project.products.map((product) => (
                <Card key={product.id} className="hover:shadow-sm">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.deploymentUrl || 'Not deployed'}
                      </p>
                    </div>
                    <Badge variant={product.status === 'DEPLOYED' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No products generated yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
