import { NextResponse } from 'next/server';

const TALENT_PROTOCOL_API_URL = 'https://api.talentprotocol.com';
const TALENT_PROTOCOL_API_KEY = process.env.TALENT_PROTOCOL_API_KEY;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('account_id');
    const accountSource = searchParams.get('account_source');

    if (!accountId || !accountSource) {
      return NextResponse.json({ error: 'Account ID and source are required' }, { status: 400 });
    }

    if (!TALENT_PROTOCOL_API_KEY) {
      return NextResponse.json(
        { error: 'Talent Protocol API key not configured' },
        { status: 500 }
      );
    }

    // Get the score data directly using the account identifier
    const scoreResponse = await fetch(
      `${TALENT_PROTOCOL_API_URL}/score?account_id=${accountId}&account_source=${accountSource}`,
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