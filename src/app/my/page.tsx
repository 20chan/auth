import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/SignOutButton';
import { auth } from '@/lib/auth';

const ADMIN_ID = process.env.ADMIN_ID;

export default async function MyPage() {
  const session = await auth();

  if (session?.user?.id === ADMIN_ID) {
    redirect('/my/admin');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='text-4xl mb-4'>
        auth
      </div>

      <div>
        {session?.user?.name}
      </div>

      <SignOutButton />
    </div>
  );
}