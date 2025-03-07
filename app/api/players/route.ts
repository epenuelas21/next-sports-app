import { NextResponse } from 'next/server'

const ODDS_API_KEY = process.env.ODDS_API_KEY
const SPORTS_API_KEY = process.env.SPORTSDATAIO_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get('sport') || 'NBA'

  if (!ODDS_API_KEY || !SPORTS_API_KEY) {
    console.error('API keys not configured')
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    )
  }

  try {
    console.log(`Fetching data for sport: ${sport}`)
    
    // Map sport names to API keys
    const sportKeyMap: { [key: string]: string } = {
      'NBA': 'basketball_nba',
      'NFL': 'americanfootball_nfl',
      'MLB': 'baseball_mlb'
    }

    const sportKey = sportKeyMap[sport] || sport.toLowerCase()

    console.log(`Using sport key: ${sportKey}`)

    // For now, return mock data to test the frontend
    const mockPlayers = [
      {
        id: '1',
        name: 'LeBron James',
        team: 'Lakers',
        position: 'SF',
        projection: 28.5,
        line: 27.5,
        edge: 3.6,
        confidence: 85,
        opponent: 'Warriors',
        gameTime: '7:30 PM',
        stats: {
          points: 28.5,
          rebounds: 8.2,
          assists: 7.1,
          pointsLine: '27.5',
          reboundsLine: '7.5',
          assistsLine: '6.5'
        }
      },
      {
        id: '2',
        name: 'Stephen Curry',
        team: 'Warriors',
        position: 'PG',
        projection: 32.5,
        line: 31.5,
        edge: 3.2,
        confidence: 82,
        opponent: 'Lakers',
        gameTime: '7:30 PM',
        stats: {
          points: 32.5,
          rebounds: 5.2,
          assists: 6.8,
          pointsLine: '31.5',
          reboundsLine: '5.0',
          assistsLine: '6.5'
        }
      },
      {
        id: '3',
        name: 'Anthony Davis',
        team: 'Lakers',
        position: 'PF',
        projection: 24.5,
        line: 23.5,
        edge: 4.3,
        confidence: 88,
        opponent: 'Warriors',
        gameTime: '7:30 PM',
        stats: {
          points: 24.5,
          rebounds: 12.2,
          assists: 3.1,
          pointsLine: '23.5',
          reboundsLine: '12.0',
          assistsLine: '3.0'
        }
      }
    ]

    return NextResponse.json(mockPlayers)
  } catch (error) {
    console.error('Error in players API route:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch players',
        details: 'Please try again later or contact support if the issue persists.'
      },
      { status: 500 }
    )
  }
}

// Helper functions for calculations
function calculateEdge(projection: number, line: number): number {
  if (!projection || !line) return 0
  return ((projection - line) / line) * 100
}

function calculateConfidence(avgPoints: number, line: number): number {
  if (!avgPoints || !line) return 0
  const standardDeviation = 5 // Approximate standard deviation for NBA points
  const zScore = Math.abs(avgPoints - line) / standardDeviation
  return Math.min(Math.round((1 - Math.exp(-zScore)) * 100), 100)
} 