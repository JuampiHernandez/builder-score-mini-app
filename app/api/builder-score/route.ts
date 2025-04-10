import { NextResponse } from 'next/server';

const TALENT_PROTOCOL_API_URL = 'https://api.talentprotocol.com';
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const accountSource = searchParams.get('account_source');

    if (!id || !accountSource) {
      return NextResponse.json({ error: 'ID and account source are required' }, { status: 400 });
    }

    if (!TALENT_PROTOCOL_API_KEY) {
      return NextResponse.json(
        { error: 'Talent Protocol API key not configured' },
        { status: 500 }
      );
    }

    // Get the score data using the correct endpoint parameters
    const scoreResponse = await fetch(
      `${TALENT_PROTOCOL_API_URL}/score?id=${id}&account_source=${accountSource}`,
      {
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': TALENT_PROTOCOL_API_KEY,
        },
      }
    );

    if (!scoreResponse.ok) {
      const errorData = await scoreResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch score data' },
        { status: scoreResponse.status }
      );
    }

    const scoreData = await scoreResponse.json();
    return NextResponse.json({ 
      score: scoreData.score.points
    });
  } catch (error) {
    console.error('Error fetching builder score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch builder score' },
      { status: 500 }
    );
  }
} 