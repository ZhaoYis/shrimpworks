'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const columns = [
  {
    id: 'pending',
    title: 'Pending',
    tasks: [
      { id: '1', title: 'Setup database schema', priority: 'HIGH', assignee: 'John' },
      { id: '2', title: 'Create API endpoints', priority: 'MEDIUM', assignee: 'Jane' },
    ],
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Implement authentication', priority: 'HIGH', assignee: 'John' },
      { id: '4', title: 'Design UI components', priority: 'LOW', assignee: 'Alice' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: '5', title: 'Code review for API', priority: 'MEDIUM', assignee: 'Bob' },
    ],
  },
  {
    id: 'completed',
    title: 'Completed',
    tasks: [
      { id: '6', title: 'Project setup', priority: 'HIGH', assignee: 'John' },
      { id: '7', title: 'CI/CD pipeline', priority: 'MEDIUM', assignee: 'DevOps Agent' },
    ],
  },
];

const priorityColors: Record<string, string> = {
  HIGH: 'bg-red-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
};

export function TasksBoard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="secondary">{column.tasks.length}</Badge>
          </div>
          <div className="space-y-2">
            {column.tasks.map((task) => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                      <span className="text-xs text-muted-foreground">{task.priority}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{task.assignee}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
