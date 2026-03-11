import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrgSettings } from '@/components/org/org-settings';

export default function OrgPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Organization</h2>
          <p className="text-muted-foreground">
            Manage your organization settings, members, and departments.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <OrgSettings />
    </div>
  );
}
