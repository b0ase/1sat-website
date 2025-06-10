import { NextRequest, NextResponse } from 'next/server';
import { getHandCashRedirectUrl } from '@/utils/handcash';

export async function GET(request: NextRequest) {
  try {
    const redirectUrl = getHandCashRedirectUrl();

    return NextResponse.json({
      success: true,
      redirectUrl
    });
  } catch (error) {
    console.error('HandCash login URL generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate login URL' },
      { status: 500 }
    );
  }
}
