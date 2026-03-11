'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Settings } from 'lucide-react';

const agents = [
  { id: '1', name: 'Project Manager', type: 'PROJECT_MANAGER', status: 'IDLE', department: 'Management' },
  { id: '2', name: 'Architect', type: 'ARCHITECT', status: 'BUSY', department: 'Development' },
  { id: '3', name: 'Frontend Developer', type: 'FRONTEND_DEVELOPER', status: 'BUSY', department: 'Development' },
  { id: '4', name: 'Backend Developer', type: 'BACKEND_DEVELOPER', status: 'IDLE', department: 'Development' },
  { id: '5', name: 'DevOps Engineer', type: 'DEVOPS_ENGINEER', status: 'IDLE', department: 'Operations' },
  { id: '6', name: 'QA Engineer', type: 'QA_ENGINEER', status: 'BUSY', department: 'Quality' },
  { id: '7', name: 'Security Engineer', type: 'SECURITY_ENGINEER', status: 'IDLE', department: 'Security' },
  { id: '8', name: 'Data Engineer', type: 'DATA_ENGINEER', status: 'IDLE', department: 'Data' },
  { id: '9', name: 'AI/ML Engineer', type: 'AI_ML_ENGINEER', status: 'BUSY', department: 'AI' },
  { id: '10', name: 'UI/UX Designer', type: 'UI_UX_DESIGNER', status: 'IDLE', department: 'Design' },
  { id: '11', name: 'Technical Writer', type: 'TECHNICAL_WRITER', status: 'IDLE', department: 'Documentation' },
  { id: '12', name: 'Code Reviewer', type: 'CODE_REVIEWER', status: 'BUSY', department: 'Quality' },
];

export function AgentsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">{agent.name}</CardTitle>
                <CardDescription>{agent.department}</CardDescription>
              </div>
              <Badge variant={agent.status === 'BUSY' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" disabled={agent.status === 'BUSY'}>
                <Play className="mr-2 h-3 w-3" />
                Run
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
