import { Metadata } from "next"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ProjectionsPage from "./page"

export const metadata: Metadata = {
  title: "Projections | Next Sports App",
  description: "View and analyze player projections",
}

export default async function ProjectionsLayout() {
  try {
    // Server-side Supabase client with awaited cookies
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // Get user session
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    const sessionResponse = await supabase.auth.getSession()
    const session = sessionResponse.data.session
    
    // Protected route - if no session, redirect to login
    if (!session) {
      redirect('/login?redirectedFrom=/projections')
    }
    
    return <ProjectionsPage initialSession={session} />
  } catch (error) {
    console.error('Error in projections layout:', error)
    redirect('/login?redirectedFrom=/projections')
  }
} 