export default async function handler(req, res) {
    // 1. Retrieve our API key from environment
    const apiKey = process.env.SPORTSDATAIO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }
  
    try {
      // 2. Fetch NBA teams from SportsDataIO API
      const teamsResponse = await fetch(
        `https://api.sportsdata.io/v3/nba/scores/json/Teams?key=${apiKey}`
      );
      const teams = await teamsResponse.json();
  
      // 3. Fetch NBA players from SportsDataIO API
      const playersResponse = await fetch(
        `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${apiKey}`
      );
      const players = await playersResponse.json();
  
      // 4. Return the data as JSON
      res.status(200).json({ teams, players });
    } catch (err) {
      console.error("SportsDataIO fetch error:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }