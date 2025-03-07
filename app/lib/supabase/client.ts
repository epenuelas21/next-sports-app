import { createClient } from '@supabase/supabase-js'

// Hard-coded values as fallback (same as in .env files)
const FALLBACK_URL = 'https://blqyrfzfimtuvmdyborl.supabase.co'
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscXlyZnpmaW10dXZtZHlib3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMjg1MDEsImV4cCI6MjA1NjkwNDUwMX0.LUpT77rWRYdTU-KB80eLPCjd5cn1r5ryK8L8GcFEzYA'

export function createSupabaseClient(url?: string, key?: string) {
  try {
    // Use provided credentials, then environment variables, then fallbacks
    const supabaseUrl = url || process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
    const supabaseAnonKey = key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY

    // Create the client with the determined credentials
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
}

// Export a singleton instance for convenience
export const supabase = createSupabaseClient() 