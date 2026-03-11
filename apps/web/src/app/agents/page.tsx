import { Play, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentsGrid } from '@/components/agents/agents-grid';

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Agents</h2>
          <p className="text-muted-foreground">
            Configure and manage your 18 specialized AI agents.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="mr-2 h-4 w-4" />
            Run All Agents
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Configure Agent
          </Button>
        </div>
      </div>

      <AgentsGrid />
    </div>
  );
}
