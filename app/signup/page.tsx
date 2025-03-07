import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignupForm from './SignupForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Next Sports App',
  description: 'Create your Next Sports App account',
}

export default async function SignupPage() {
  try {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // Get user info
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    
    // If user is already logged in, redirect to home
    if (user) {
      redirect('/')
    }
    
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h1>
          <SignupForm />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in signup page:', error)
    
    // Show signup form anyway if there's an error
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h1>
          <SignupForm />
        </div>
      </div>
    )
  }
} 