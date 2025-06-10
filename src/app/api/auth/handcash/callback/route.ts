import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile } from '@/utils/handcash';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authToken = searchParams.get('authToken');

    if (!authToken) {
      return NextResponse.redirect(new URL('/?error=no_auth_token', request.url));
    }

    // Get user profile from HandCash
    const { publicProfile } = await getUserProfile(authToken);

    // Store auth token in secure HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set('handcash_auth_token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store user info in cookie for client access
    cookieStore.set('handcash_user', JSON.stringify({
      handle: publicProfile.handle,
      displayName: publicProfile.displayName,
      avatarUrl: publicProfile.avatarUrl,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Redirect to home page with success
    return NextResponse.redirect(new URL('/?handcash_connected=true', request.url));
  } catch (error) {
    console.error('HandCash callback error:', error);
    return NextResponse.redirect(new URL('/?error=handcash_auth_failed', request.url));
  }
}
