import { handler, providers } from '@/lib/auth';
import { SignInButton } from './SignInButton';

export function SignInButtons() {
  console.log(handler);

  return (
    <div className='flex space-x-4'>
      {providers.map((provider) => (
        <SignInButton key={provider.id} provider={provider.id} />
      ))}
    </div>
  )
}