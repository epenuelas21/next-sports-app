"use client"

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase/client'
import { Session } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'

interface HomePageProps {
  initialSession: Session | null
}

export default function HomePage({ initialSession }: HomePageProps) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(initialSession)
  const sectionsRef = useRef<HTMLElement[]>([])
  const [selectedSport, setSelectedSport] = useState("NBA")

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleFindPicksClick() {
    try {
      if (session) {
        router.push('/projections')
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Error checking session:', error)
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Decorative gradient elements */}
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] opacity-70">
        <div className="w-full h-full bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] rounded-full blur-3xl transform translate-x-1/3"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] text-transparent bg-clip-text">Next Sports App</h1>
          <div className="mt-4 flex gap-4">
            {session ? (
              <>
                <Button 
                  onClick={() => router.push('/projections')}
                  className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300"
                >
                  My Projections
                </Button>
                <Button 
                  onClick={() => router.push('/profile')}
                  className="bg-gray-800 hover:bg-gray-700 transition duration-300"
                >
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => supabase.auth.signOut()}
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => router.push('/login')}
                  className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => router.push('/signup')}
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#0077B6] text-transparent bg-clip-text">
            Get the Edge on Your Sports Picks
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Access advanced analytics, real-time odds, and personalized recommendations to make smarter bets.
          </p>
          <Button 
            size="lg" 
            onClick={handleFindPicksClick}
            className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300 text-lg px-8 py-6"
          >
            Find Picks Now
          </Button>
        </section>
        
        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-[#00B4D8] transition-colors duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] rounded-lg mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Advanced Analytics</h3>
            <p className="text-gray-400">Access detailed player and team statistics to inform your betting decisions with data-driven insights.</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-[#00B4D8] transition-colors duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] rounded-lg mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Live Odds</h3>
            <p className="text-gray-400">Get real-time updates on betting odds across major sportsbooks to find the best value for your wagers.</p>
          </div>
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 p-8 rounded-lg hover:border-[#00B4D8] transition-colors duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] rounded-lg mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Personalized Picks</h3>
            <p className="text-gray-400">Receive tailored recommendations based on your preferences and betting history for maximum success.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-10 text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-white">Ready to Start Winning?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of sports bettors who are already using our platform to make smarter, more profitable bets.
          </p>
          <Button 
            onClick={handleFindPicksClick}
            className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300"
          >
            Get Started Now
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Next Sports App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 