import { providers } from '@/lib/auth';
import { SignInButton } from './SignInButton';

export function SignInButtons(props: {
  callbackUrl?: string;
}) {

  return (
    <div className='flex space-x-4'>
      {providers.map((provider) => (
        <SignInButton key={provider.id} provider={provider.id} callbackUrl={props.callbackUrl} />
      ))}
    </div>
  )
}