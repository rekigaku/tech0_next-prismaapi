import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@prisma/client';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const result = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!result) {
          return null
        }
        if (credentials.password !== result.password) {
          throw new Error('Password wrong')
        }
        return result
      },
    }),
  ],
  secret: 'secretKey',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'secretKey',
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('-------------token--------------')
      console.log('token :', token)
      console.log('user :', user)
      console.log('account :', account)
      console.log('profile :', profile)
      console.log('isNewUser :', isNewUser)
      return token
    },
    async session({ session, token, user }) {
      console.log('-------------session--------------')
      console.log('session :', session)
      console.log('token :', token)
      console.log('user :', user)
      return session
    },
  },
})