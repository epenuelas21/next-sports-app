"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TestSupabase() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initSupabase() {
      try {
        console.log('Initializing Supabase client...')
        const supabase = createClientComponentClient()
        
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        
        console.log('Supabase connection successful:', data)
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    initSupabase()
  }, [])

  if (isLoading) {
    return <div className="text-yellow-500">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return <div className="text-green-500">Supabase client initialized successfully</div>
} 