// pages/api/combined.js
export default async function handler(req, res) {
    const nbaApiKey = process.env.SPORTS_DATA_API_KEY;
    const oddsApiKey = process.env.ODDS_API_KEY;
  
    // Fetch NBA data
    const nbaResponse = await fetch(`https://api.sportsdata.io/v3/nba/stats/json/SomeEndpoint?key=${nbaApiKey}`);
    const nbaData = nbaResponse.ok ? await nbaResponse.json() : null;
  
    // Fetch Odds data
    const oddsResponse = await fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${oddsApiKey}`);
    const oddsData = oddsResponse.ok ? await oddsResponse.json() : null;
  
    // (Optional) Merge or normalize the data as needed.
    // For example, if both APIs include a game identifier, you could join the records.
    const combinedData = {
      nba: nbaData,
      odds: oddsData,
    };
  
    res.status(200).json(combinedData);
  }