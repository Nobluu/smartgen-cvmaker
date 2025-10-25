import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Check if Google OAuth is configured
const isGoogleConfigured = 
  process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_ID !== '' &&
  process.env.GOOGLE_CLIENT_SECRET !== ''

const providers = []

// Only add Google provider if credentials are available
if (isGoogleConfigured) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  )
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  providers,
  callbacks: {
    async signIn({ account, profile }) {
      // Allow all sign ins
      return true
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to home page after sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
