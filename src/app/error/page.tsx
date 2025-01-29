import Link from 'next/link';

export default async function ErrorPage(props: {
  searchParams: Promise<{ error: string }>;
}) {
  const { error } = await props.searchParams;
  const message = messages[error];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='text-4xl'>
        {error}
      </div>

      {message && (
        <div>
          {message}
        </div>
      )}

      <div className='mt-4'>
        <Link href='/'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

const messages: Record<string, string> = {
  'AccessDenied': 'You should contact admin',
};