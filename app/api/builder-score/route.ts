import { NextResponse } from 'next/server';

const TALENT_PROTOCOL_API_URL = 'https://api.talentprotocol.com';
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    if (!TALENT_PROTOCOL_API_KEY) {
      return NextResponse.json(
        { error: 'Talent Protocol API key not configured' },
        { status: 500 }
      );
    }

    // First get the profile data to get the account identifier
    const profileResponse = await fetch(
      `${TALENT_PROTOCOL_API_URL}/profile?username=${username}`,
      {
        headers: {
          'X-API-KEY': TALENT_PROTOCOL_API_KEY,
        },
      }
    );

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch profile data' },
        { status: profileResponse.status }
      );
    }

    const profileData = await profileResponse.json();
    const accountId = profileData.account_id;

    // Then get the score data
    const scoreResponse = await fetch(
      `${TALENT_PROTOCOL_API_URL}/score?account_id=${accountId}`,
      {
        headers: {
          'X-API-KEY': TALENT_PROTOCOL_API_KEY,
        },
      }
    );

    if (!scoreResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch score data' },
        { status: scoreResponse.status }
      );
    }

    const scoreData = await scoreResponse.json();
    return NextResponse.json({ score: scoreData.builder_score });
  } catch (error) {
    console.error('Error fetching builder score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch builder score' },
      { status: 500 }
    );
  }
} 