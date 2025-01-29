'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      className='bg-h-tone hover:bg-h-tone/90 text-h-background w-64 h-12 flex items-center justify-center cursor-pointer'
      onClick={async () => {
        await signOut();
      }}>
      Sign Out
    </button>
  );
}