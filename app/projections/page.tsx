"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/app/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Player {
  id: string
  name: string
  team: string
  position: string
  projection: number
  line: number
  edge: number
  confidence: number
}

interface ProjectionsPageProps {
  initialSession: Session | null
}

export default function ProjectionsPage({ initialSession }: ProjectionsPageProps) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(initialSession)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSport, setSelectedSport] = useState("NBA")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (!session) {
          // Redirect to login if session is lost
          router.push('/login')
        }
      }
    )

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  useEffect(() => {
    fetchPlayers()
  }, [selectedSport])

  async function fetchPlayers() {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/players?sport=${selectedSport}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch players')
      }
      
      setPlayers(data)
    } catch (err) {
      console.error('Error fetching players:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while fetching players')
      setPlayers([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // If no session, show a loading state or redirect in useEffect
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8] mx-auto"></div>
      </div>
    )
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
              Player Projections
            </h1>
            <p className="mt-2 text-gray-400">
              Find the best value in player props across all major sportsbooks
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
      <main className="relative z-10 container mx-auto px-4 py-6">
        {/* Filters Section */}
        <Card className="mb-6 bg-black/50 backdrop-blur-sm border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sport" className="text-gray-300">Sport</Label>
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger className="bg-black/30 border-gray-700 text-white">
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NBA">NBA</SelectItem>
                    <SelectItem value="NFL">NFL</SelectItem>
                    <SelectItem value="MLB">MLB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search" className="text-gray-300">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by player or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/30 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort" className="text-gray-300">Sort By</Label>
                <Select defaultValue="edge">
                  <SelectTrigger className="bg-black/30 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edge">Edge</SelectItem>
                    <SelectItem value="confidence">Confidence</SelectItem>
                    <SelectItem value="projection">Projection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] hover:shadow-lg transition duration-300">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B4D8] mx-auto"></div>
            </div>
          ) : error ? (
            <div className="col-span-full">
              <Card className="bg-red-500/10 border-red-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p>{error}</p>
                  </div>
                  <Button 
                    onClick={fetchPlayers}
                    className="mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              No players found
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <Card key={player.id} className="bg-black/50 backdrop-blur-sm border-gray-800 hover:border-[#00B4D8] transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{player.name}</h3>
                      <p className="text-gray-400">{player.team} • {player.position}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      player.edge > 0 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {player.edge > 0 ? '+' : ''}{player.edge}%
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Projection</p>
                      <p className="text-white font-semibold">{player.projection}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Line</p>
                      <p className="text-white font-semibold">{player.line}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#00B4D8]"></div>
                      <span className="text-sm text-gray-400">{player.confidence}% confidence</span>
                    </div>
                    <Button className="bg-gradient-to-r from-[#90E0EF] to-[#00B4D8] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
} 