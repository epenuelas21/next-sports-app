import { Metadata } from "next"
import LoginForm from './LoginForm'
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: "Login | Next Sports App",
  description: "Login to your account",
}

export default async function LoginPage() {
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
        {/* Analytics Background Pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#90E0EF_1px,transparent_1px)] opacity-[0.15] [background-size:32px_32px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00B4D8_1px,transparent_1px),linear-gradient(to_bottom,#00B4D8_1px,transparent_1px)] opacity-[0.1] [background-size:32px_32px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-md px-4">
          <div className="text-center mb-8">
            <Link href="/">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-transparent bg-clip-text">
                PropFinds
              </h1>
            </Link>
            <p className="text-gray-400 mt-2">Sign in to access your picks</p>
          </div>

          <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
            <CardContent className="pt-6">
              <LoginForm />
            </CardContent>
          </Card>

          <p className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#00B4D8] hover:text-[#90E0EF] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in login page:', error)
    
    // Show login form anyway if there's an error
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Sign In</h1>
          <LoginForm />
        </div>
      </div>
    )
  }
} 