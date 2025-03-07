"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase/client'
import { Session } from '@supabase/supabase-js'

export default function ProfilePage() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function getSession() {
      try {
        setLoading(true)
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        
        if (!session) {
          router.push('/login?redirectedFrom=/profile')
          return
        }
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setSession(session)
            if (!session) {
              router.push('/login')
            }
          }
        )
        
        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }
    
    getSession()
  }, [router])
  
  async function handleSignOut() {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8] mx-auto"></div>
      </div>
    )
  }
  
  if (!session) {
    return null // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Decorative gradient elements */}
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="absolute right-0 top-1/2 w-[400px] h-[400px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] rounded-full blur-3xl transform translate-x-1/3"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-gray-800 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] text-transparent bg-clip-text">
              User Profile
            </h1>
            <p className="mt-2 text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="border-gray-700 hover:bg-gray-800"
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="bg-black/50 backdrop-blur-sm border-gray-800 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Email</h3>
                  <p className="text-gray-400">{session.user.email}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-300">User ID</h3>
                  <p className="text-gray-400">{session.user.id}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Last Sign In</h3>
                  <p className="text-gray-400">
                    {new Date(session.user.last_sign_in_at || '').toLocaleString() || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300"
                    onClick={() => router.push('/projections')}
                  >
                    View Projections
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400">Account Status</h3>
                <p className="text-xl font-bold text-green-400">Active</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400">Member Since</h3>
                <p className="text-xl font-bold text-white">
                  {new Date(session.user.created_at || '').toLocaleDateString() || 'N/A'}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400">Subscription</h3>
                <p className="text-xl font-bold text-white">Free Tier</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 