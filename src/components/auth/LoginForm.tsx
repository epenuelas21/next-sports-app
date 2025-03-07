'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement actual authentication once Supabase is set up
      router.push('/dashboard')
      router.refresh()
    } catch (e) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="w-full p-2 bg-black/30 border border-gray-700 rounded-md text-white placeholder:text-gray-400"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="w-full p-2 bg-black/30 border border-gray-700 rounded-md text-white placeholder:text-gray-400"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button 
        type="submit" 
        className="w-full py-2 px-4 bg-gradient-to-r from-[#90E0EF] via-[#00B4D8] to-[#FF00FF] text-black font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="text-center">
        <Link 
          href="/reset-password" 
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  )
}
