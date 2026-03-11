'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MoreHorizontal, ExternalLink, Plus, Loader2 } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { useRouter } from 'next/navigation';
import type { ProjectStatus } from '@/lib/projects';

const statusColors: Record<ProjectStatus, string> = {
  PLANNING: 'secondary',
  ACTIVE: 'default',
  PAUSED: 'outline',
  COMPLETED: 'default',
  ARCHIVED: 'outline',
} as const;

export function ProjectsList() {
  const router = useRouter();
  const { data, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-destructive">Failed to load projects</p>
        <Button variant="outline" onClick={() => router.refresh()}>
          Retry
        </Button>
      </div>
    );
  }

  const projects = data?.data || [];

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No projects yet</p>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create your first project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const totalTasks = project.taskStats?.total || 0;
        const completedTasks = project.taskStats?.byStatus?.COMPLETED || 0;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return (
          <Card
            key={project.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description || 'No description'}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  // Open menu
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={statusColors[project.status] as any}>
                    {project.status}
                  </Badge>
                  {project.department && (
                    <span className="text-xs text-muted-foreground">
                      {project.department.name}
                    </span>
                  )}
                </div>

                {totalTasks > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {completedTasks}/{totalTasks} tasks
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${project.id}`);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
