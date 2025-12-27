import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: supabaseUrl && supabaseServiceRoleKey ? SupabaseAdapter({
    url: supabaseUrl,
    secret: supabaseServiceRoleKey,
  }) : undefined,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
})