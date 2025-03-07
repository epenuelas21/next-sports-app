import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getSupabaseClient() {
  try {
    const supabase = createServerComponentClient({ cookies })
    return supabase
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
} 