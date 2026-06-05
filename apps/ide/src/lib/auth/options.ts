import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          hd: process.env.GOOGLE_ALLOWED_DOMAIN,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedDomain = process.env.GOOGLE_ALLOWED_DOMAIN
      if (!allowedDomain) return true
      const email = (profile as { email?: string })?.email ?? ''
      return email.endsWith(`@${allowedDomain}`)
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub
        const domain = session.user.email?.split('@')[1] ?? 'unknown'
        ;(session.user as any).orgId = domain.replace(/\./g, '-')
      }
      return session
    },
    async jwt({ token, profile }) {
      if (profile) token.profile = profile
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
}
