// pages/api/odds.js
export default async function handler(req, res) {
    const oddsApiKey = process.env.ODDS_API_KEY;
    // This example endpoint fetches odds for a particular sport (adjust as needed)
    const response = await fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${oddsApiKey}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch odds data' });
    }
    const data = await response.json();
    res.status(200).json(data);
  }