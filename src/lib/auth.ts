import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || '';

export const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  }),
];

export const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers,
  adapter,
  session: {
    strategy: 'database',
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NEXTAUTH_DOMAIN || '',
      },
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    signIn: async ({ user }) => {
      const userDb = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!userDb?.approvedAt) {
        return false;
      }
      return true;
    }
  },
  pages: {
    signIn: '/',
    error: '/error',
  },
};

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  const session = await getServerSession(...args, authOptions);
  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return { user };
}

export const handler = NextAuth(authOptions);