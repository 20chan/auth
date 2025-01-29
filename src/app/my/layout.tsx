import { AuthProxy } from '@/components/AuthProxy';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <AuthProxy>
      {props.children}
    </AuthProxy>
  );
}