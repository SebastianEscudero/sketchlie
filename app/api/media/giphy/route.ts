import { NextResponse } from 'next/server';

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=20`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching GIFs:', error);
    return NextResponse.json({ error: 'Failed to fetch GIFs' }, { status: 500 });
  }
}