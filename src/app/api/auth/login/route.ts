import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call the actual backend API
    const response = await fetch(`${BACKEND_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    // Check if login was successful
    if (response.ok && data.success) {
      return NextResponse.json({
        success: true,
        token: data.data.token,
        user: data.data.admin,
        message: data.message,
      });
    }

    // Handle error response
    return NextResponse.json(
      { 
        error: data.message || 'Invalid email or password',
        success: false,
      },
      { status: response.status || 401 }
    );

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { 
        error: 'Unable to connect to server. Please try again.',
        success: false,
      },
      { status: 500 }
    );
  }
}

