import { SignInButtons } from '@/components/SignInButtons';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const ADMIN_ID = process.env.ADMIN_ID;

export default async function Home(props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session?.user) {
    redirect(callbackUrl ?? '/my');
  }

  console.log({
    ADMIN_ID,
    id: session?.user,
  })

  if (session?.user?.id === ADMIN_ID) {
    redirect('/admin');
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
