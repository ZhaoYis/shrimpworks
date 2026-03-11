'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const members = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Member' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'Member' },
];

const departments = [
  { id: '1', name: 'Engineering', members: 15, agents: 8 },
  { id: '2', name: 'Design', members: 5, agents: 2 },
  { id: '3', name: 'Operations', members: 3, agents: 3 },
];

export function OrgSettings() {
  return (
    <Tabs defaultValue="members" className="space-y-4">
      <TabsList>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="departments">Departments</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="members">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your organization members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{member.role}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="departments">
        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
            <CardDescription>Manage your organization departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dept.members} members, {dept.agents} agents
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Configure your organization preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
