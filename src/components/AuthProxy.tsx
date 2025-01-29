import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function AuthProxy({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}