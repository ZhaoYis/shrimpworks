import { AppLayout } from '@/components/layout/app-layout';

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
