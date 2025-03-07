'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from '@/app/lib/supabase/client'

export function FindPicksButton() {
  const router = useRouter()

  async function handleClick() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
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
    <Button 
      onClick={handleClick}
      className="gradient-button text-black px-8 py-6 text-lg hover:shadow-lg transition duration-300"
    >
      <span>Find Picks Now</span>
    </Button>
  )
} 