import { NextResponse } from 'next/server';
import OAuth from 'oauth';

const NOUN_PROJECT_API_KEY = process.env.NOUN_PROJECT_API_KEY;
const NOUN_PROJECT_API_SECRET = process.env.NOUN_PROJECT_API_SECRET;

const oauth = new OAuth.OAuth(
  'https://api.thenounproject.com',
  'https://api.thenounproject.com',
  NOUN_PROJECT_API_KEY!,
  NOUN_PROJECT_API_SECRET!,
  '1.0',
  null,
  'HMAC-SHA1'
);

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const url = `https://api.thenounproject.com/v2/icon?limit=20&query=${encodeURIComponent(query)}`;

  return new Promise<NextResponse>((resolve) => {
    oauth.get(
      url,
      '',  // Access token (empty string for this API)
      '',  // Access secret (empty string for this API)
      function (error, data, res) {
        if (error) {
          console.error('Error fetching icons from Noun Project:', error);
          resolve(NextResponse.json({ error: 'Failed to fetch icons', details: error }, { status: 500 }));
        } else {
          try {
            const parsedData = JSON.parse(data as string);
            const icons = parsedData.icons.map((icon: any) => ({
              ...icon,
              svg_url: icon.icon_url || '' // Provide a default empty string if icon_url is undefined
            }));
            resolve(NextResponse.json({ icons }));
          } catch (parseError) {
            console.error('Error parsing Noun Project API response:', parseError);
            resolve(NextResponse.json({ error: 'Failed to parse API response', details: parseError }, { status: 500 }));
          }
        }
      }
    );
  });
}