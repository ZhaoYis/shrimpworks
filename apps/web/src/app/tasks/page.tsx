import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TasksBoard } from '@/components/tasks/tasks-board';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track tasks across all projects.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <TasksBoard />
    </div>
  );
}
