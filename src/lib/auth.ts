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
    strategy: 'jwt',
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
  pages: {
    signIn: '/',
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export const handler = NextAuth(authOptions);