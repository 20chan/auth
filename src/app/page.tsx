import { SignInButtons } from '@/components/SignInButtons';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home(props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session?.user) {
    redirect(callbackUrl ?? '/my');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='text-4xl mb-4'>
        auth
      </div>

      <SignInButtons callbackUrl={callbackUrl} />
    </div>
  );
}
