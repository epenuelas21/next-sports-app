"use client"

import { useEffect, useState } from 'react'
import { supabase, createSupabaseClient } from '@/app/lib/supabase/client'

interface SupabaseClientProps {
  supabaseUrl: string
  supabaseAnonKey: string
}

export default function SupabaseClient({ supabaseUrl, supabaseAnonKey }: SupabaseClientProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [clientInfo, setClientInfo] = useState<string>('')

  useEffect(() => {
    async function testSupabase() {
      try {
        console.log('Testing Supabase connection...')
        
        // Test with singleton
        console.log('Testing with singleton client')
        const { data: singletonData, error: singletonError } = await supabase.auth.getSession()
        if (singletonError) throw new Error(`Singleton client error: ${singletonError.message}`)
        
        // Test with provided credentials
        console.log('Testing with provided credentials')
        const customClient = createSupabaseClient(supabaseUrl, supabaseAnonKey)
        const { data: customData, error: customError } = await customClient.auth.getSession()
        if (customError) throw new Error(`Custom client error: ${customError.message}`)
        
        console.log('Supabase connection successful!')
        setClientInfo(`Connected to: ${supabaseUrl}`)
        setStatus('success')
      } catch (err) {
        console.error('Error connecting to Supabase:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStatus('error')
      }
    }

    testSupabase()
  }, [supabaseUrl, supabaseAnonKey])

  if (status === 'loading') {
    return <div className="text-yellow-500">Connecting to Supabase...</div>
  }

  if (status === 'error') {
    return (
      <div className="text-red-500">
        <p>Error connecting to Supabase: {error}</p>
        <p className="mt-2 text-sm">
          Credentials: URL={supabaseUrl ? 'Provided' : 'Missing'}, 
          Key={supabaseAnonKey ? 'Provided' : 'Missing'}
        </p>
      </div>
    )
  }

  return (
    <div className="text-green-500">
      <p>Supabase client initialized successfully!</p>
      <p className="text-sm mt-2">{clientInfo}</p>
    </div>
  )
} 