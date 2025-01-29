import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  const user = session?.user;

  return Response.json({
    user,
  });
}