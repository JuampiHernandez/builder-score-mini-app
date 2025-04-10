import { NextRequest } from 'next/server';

const TALENT_PROTOCOL_API_URL = 'https://api.talentprotocol.com';
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { fid } = data.untrustedData;

    // Get the score data using the Talent Protocol API
    const scoreResponse = await fetch(
      `${TALENT_PROTOCOL_API_URL}/score?id=${fid}&account_source=farcaster`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': TALENT_PROTOCOL_API_KEY || '',
        },
      }
    );

    if (!scoreResponse.ok) {
      throw new Error('Failed to fetch builder score');
    }

    const scoreData = await scoreResponse.json();
    const score = scoreData.score.points;

    return new Response(
      JSON.stringify({
        version: 1,
        frames: [
          {
            image: "https://builderscoreminiapp.vercel.app/images/talent_svg_long.svg",
            buttons: [
              {
                label: `Your Builder Score: ${score}`,
                action: "post"
              }
            ]
          }
        ]
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in frame endpoint:', error);
    return new Response(
      JSON.stringify({
        version: 1,
        frames: [
          {
            image: "https://builderscoreminiapp.vercel.app/images/talent_svg_long.svg",
            buttons: [
              {
                label: "Error fetching score. Try again?",
                action: "post"
              }
            ]
          }
        ]
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  }
} 