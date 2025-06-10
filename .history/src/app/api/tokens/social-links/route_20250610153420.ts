import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In-memory storage for demo purposes - in production, use a database
const tokenSocialLinks = new Map<string, any>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tokenId = searchParams.get('tokenId');
    const tick = searchParams.get('tick');

    const key = tokenId || tick;
    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Token ID or tick required' },
        { status: 400 }
      );
    }

    const socialLinks = tokenSocialLinks.get(key) || {};

    return NextResponse.json({
      success: true,
      socialLinks
    });
  } catch (error) {
    console.error('Get social links error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get social links' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('handcash_auth_token')?.value;

    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { tokenId, tick, socialLinks } = body;

    const key = tokenId || tick;
    if (!key) {
      return NextResponse.json(
        { success: false, error: 'Token ID or tick required' },
        { status: 400 }
      );
    }

    // Validate social links format
    const validatedLinks: any = {};
    if (socialLinks.website && isValidUrl(socialLinks.website)) {
      validatedLinks.website = socialLinks.website;
    }
    if (socialLinks.twitter) {
      validatedLinks.twitter = socialLinks.twitter;
    }
    if (socialLinks.telegram) {
      validatedLinks.telegram = socialLinks.telegram;
    }
    if (socialLinks.discord && isValidUrl(socialLinks.discord)) {
      validatedLinks.discord = socialLinks.discord;
    }

    tokenSocialLinks.set(key, validatedLinks);

    return NextResponse.json({
      success: true,
      message: 'Social links updated successfully',
      socialLinks: validatedLinks
    });
  } catch (error) {
    console.error('Update social links error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update social links' },
      { status: 500 }
    );
  }
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
