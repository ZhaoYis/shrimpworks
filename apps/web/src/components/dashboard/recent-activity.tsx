'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    id: '1',
    user: 'John Doe',
    action: 'completed task',
    target: 'Setup authentication',
    time: '2 minutes ago',
    avatar: '',
  },
  {
    id: '2',
    user: 'AI Agent',
    action: 'generated',
    target: 'API documentation',
    time: '5 minutes ago',
    avatar: '',
  },
  {
    id: '3',
    user: 'Jane Smith',
    action: 'created project',
    target: 'E-commerce Platform',
    time: '1 hour ago',
    avatar: '',
  },
  {
    id: '4',
    user: 'DevOps Agent',
    action: 'deployed',
    target: 'production environment',
    time: '2 hours ago',
    avatar: '',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} />
            <AvatarFallback>
              {activity.user === 'AI Agent' ? '🤖' : activity.user.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user}{' '}
              <span className="text-muted-foreground font-normal">
                {activity.action}
              </span>{' '}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
