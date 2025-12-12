import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const headers = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return NextResponse.json({
      success: true,
      diagnostics: {
        host: request.headers.get('host'),
        origin: request.headers.get('origin'),
        'x-forwarded-host': request.headers.get('x-forwarded-host'),
        'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
      },
      allHeaders: headers
    });
  } catch (error) {
    return NextResponse.json({
        success: false,
        error: error.message
    }, { status: 500 });
  }
}
