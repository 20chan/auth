'use client';

import { signIn } from 'next-auth/react';

export function SignInButton(props: {
  provider: string;
}) {
  return (
    <button
      className='bg-h-tone hover:bg-h-tone/90 text-h-background w-64 h-12 flex items-center justify-center cursor-pointer'
      onClick={async () => {
        await signIn(props.provider);
      }}>
      {props.provider}
    </button>
  );
}