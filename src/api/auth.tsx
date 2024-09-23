import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === '1234') {
    cookies().set('isAuthenticated', 'true', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });
    return NextResponse.json({ message: 'Authentication successful' });
  } else {
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
  }
}
