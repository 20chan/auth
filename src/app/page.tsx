import { SignInButtons } from '@/components/SignInButtons';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/my');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='text-4xl mb-4'>
        auth
      </div>

      <SignInButtons />
    </div>
  );
}
