import { NextResponse } from 'next/server';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=20`, {
      headers: {
        Authorization: PEXELS_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error('Pexels Video API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching videos from Pexels:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}