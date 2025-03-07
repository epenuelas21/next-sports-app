import { createClient } from '@supabase/supabase-js'

// This is a workaround for environment variable issues
// IMPORTANT: Replace these with your actual Supabase URL and anon key
// DO NOT COMMIT THIS FILE WITH REAL CREDENTIALS
// This is just for debugging purposes

const supabaseUrl = 'REPLACE_WITH_YOUR_SUPABASE_URL' // e.g., 'https://abcdefghijklmn.supabase.co'
const supabaseAnonKey = 'REPLACE_WITH_YOUR_SUPABASE_ANON_KEY' 

export function createHardcodedClient() {
  if (supabaseUrl === 'REPLACE_WITH_YOUR_SUPABASE_URL' || 
      supabaseAnonKey === 'REPLACE_WITH_YOUR_SUPABASE_ANON_KEY') {
    console.error('Please replace the placeholder values in hardcoded-client.ts')
    throw new Error('Supabase credentials not configured')
  }
  
  try {
    const client = createClient(supabaseUrl, supabaseAnonKey)
    return client
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
} 