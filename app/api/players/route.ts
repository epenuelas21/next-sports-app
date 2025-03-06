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

    // Fetch games and player props
    const [gamesResponse, playerPropsResponse] = await Promise.all([
      fetch(
        `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${ODDS_API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${ODDS_API_KEY}&regions=us&markets=player_points,player_rebounds,player_assists&oddsFormat=american`,
        { next: { revalidate: 300 } }
      )
    ])

    if (!gamesResponse.ok) {
      const errorText = await gamesResponse.text()
      console.error('Games API error:', {
        status: gamesResponse.status,
        statusText: gamesResponse.statusText,
        body: errorText
      })
      throw new Error(`Failed to fetch games: ${gamesResponse.status} ${gamesResponse.statusText}`)
    }

    if (!playerPropsResponse.ok) {
      const errorText = await playerPropsResponse.text()
      console.error('Player Props API error:', {
        status: playerPropsResponse.status,
        statusText: playerPropsResponse.statusText,
        body: errorText
      })
      throw new Error(`Failed to fetch player props: ${playerPropsResponse.status} ${playerPropsResponse.statusText}`)
    }

    const games = await gamesResponse.json()
    const playerProps = await playerPropsResponse.json()

    console.log('Games data:', games.map((g: any) => ({ 
      home: g.home_team, 
      away: g.away_team,
      time: g.commence_time 
    })))
    console.log('Player props data:', playerProps.map((p: any) => ({
      home: p.home_team,
      away: p.away_team,
      markets: Object.keys(p)
    })))

    // Fetch player data from sports API
    const playersResponse = await fetch(
      `https://api.sportsdata.io/v3/${sport.toLowerCase()}/stats/json/players?key=${SPORTS_API_KEY}`,
      { next: { revalidate: 3600 } }
    )

    if (!playersResponse.ok) {
      const errorText = await playersResponse.text()
      console.error('SportsData API error:', {
        status: playersResponse.status,
        statusText: playersResponse.statusText,
        body: errorText
      })
      throw new Error(`Failed to fetch player data: ${playersResponse.status} ${playersResponse.statusText}`)
    }

    const playersData = await playersResponse.json()
    console.log('Players data sample:', playersData.slice(0, 2).map((p: any) => ({
      name: p.Name,
      team: p.Team,
      position: p.Position,
      points: p.Points
    })))

    // Process the data to create player projections
    const players = games.flatMap((game: any) => {
      const homeTeam = game.home_team
      const awayTeam = game.away_team
      const gameTime = new Date(game.commence_time).toLocaleTimeString()

      // Find players for each team
      const homePlayers = playersData.filter((p: any) => p.Team === homeTeam)
      const awayPlayers = playersData.filter((p: any) => p.Team === awayTeam)

      console.log(`Found ${homePlayers.length} home players and ${awayPlayers.length} away players for game ${homeTeam} vs ${awayTeam}`)

      // Find player props for this game
      const gameProps = playerProps.find((p: any) => 
        p.home_team === homeTeam && p.away_team === awayTeam
      )

      // Create player objects with real data
      return [
        ...homePlayers.map((player: any) => {
          // Find player props for points, rebounds, and assists
          const pointsProps = gameProps?.player_points?.find((p: any) => p.player === player.Name)
          const reboundsProps = gameProps?.player_rebounds?.find((p: any) => p.player === player.Name)
          const assistsProps = gameProps?.player_assists?.find((p: any) => p.player === player.Name)

          return {
            id: `${player.PlayerID}-${game.id}`,
            name: player.Name,
            team: homeTeam,
            position: player.Position,
            projection: pointsProps?.outcomes?.[0]?.price || 0,
            line: pointsProps?.outcomes?.[0]?.name || 0,
            edge: calculateEdge(pointsProps?.outcomes?.[0]?.price || 0, pointsProps?.outcomes?.[0]?.name || 0),
            confidence: calculateConfidence(player.Points, pointsProps?.outcomes?.[0]?.name || 0),
            opponent: awayTeam,
            gameTime,
            stats: {
              points: player.Points,
              rebounds: player.Rebounds,
              assists: player.Assists,
              pointsLine: pointsProps?.outcomes?.[0]?.name,
              reboundsLine: reboundsProps?.outcomes?.[0]?.name,
              assistsLine: assistsProps?.outcomes?.[0]?.name,
            }
          }
        }),
        ...awayPlayers.map((player: any) => {
          // Find player props for points, rebounds, and assists
          const pointsProps = gameProps?.player_points?.find((p: any) => p.player === player.Name)
          const reboundsProps = gameProps?.player_rebounds?.find((p: any) => p.player === player.Name)
          const assistsProps = gameProps?.player_assists?.find((p: any) => p.player === player.Name)

          return {
            id: `${player.PlayerID}-${game.id}`,
            name: player.Name,
            team: awayTeam,
            position: player.Position,
            projection: pointsProps?.outcomes?.[0]?.price || 0,
            line: pointsProps?.outcomes?.[0]?.name || 0,
            edge: calculateEdge(pointsProps?.outcomes?.[0]?.price || 0, pointsProps?.outcomes?.[0]?.name || 0),
            confidence: calculateConfidence(player.Points, pointsProps?.outcomes?.[0]?.name || 0),
            opponent: homeTeam,
            gameTime,
            stats: {
              points: player.Points,
              rebounds: player.Rebounds,
              assists: player.Assists,
              pointsLine: pointsProps?.outcomes?.[0]?.name,
              reboundsLine: reboundsProps?.outcomes?.[0]?.name,
              assistsLine: assistsProps?.outcomes?.[0]?.name,
            }
          }
        })
      ]
    })

    console.log(`Generated ${players.length} player projections`)
    return NextResponse.json(players)
  } catch (error) {
    console.error('Error in players API route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch players' },
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