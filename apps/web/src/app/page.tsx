import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🦐 ShrimpWorks
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Enterprise SaaS Factory Platform
        </p>
        <p className="text-muted-foreground mb-8 max-w-md">
          AI-powered automation platform for rapidly building and deploying SaaS products.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
