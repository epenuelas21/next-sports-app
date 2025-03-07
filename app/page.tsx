import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HomePage from './components/HomePage'

export default async function Home() {
  try {
    // Server-side Supabase client with awaited cookies
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // Get user session
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    const sessionResponse = await supabase.auth.getSession()
    const session = sessionResponse.data.session
    
    return <HomePage initialSession={session} />
  } catch (error) {
    console.error('Error in home page:', error)
    // Return homepage with null session on error
    return <HomePage initialSession={null} />
  }
}