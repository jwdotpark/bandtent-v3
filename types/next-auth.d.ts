/* eslint-disable no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      description: string
      location: string
      website: string
      id: number
    } & DefaultSession['user']
  }
}
