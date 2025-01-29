import { SignOutButton } from '@/components/SignOutButton';
import { auth } from '@/lib/auth';

export default async function MyPage() {
  const session = await auth();

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