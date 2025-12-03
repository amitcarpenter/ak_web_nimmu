import { NextResponse } from 'next/server';

// Frontend-only mock data - No backend required
export async function GET() {
  // Mock categories data
  return NextResponse.json({
    data: [
      {
        id: '1',
        name: 'Restaurant',
        slug: 'restaurant',
        icon: '/icons/restaurant.svg',
        description: 'Food and dining establishments',
        status: 'ACTIVE',
        displayOrder: 1,
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Fuel Station',
        slug: 'fuel-station',
        icon: '/icons/fuel.svg',
        description: 'Petrol pumps and fuel stations',
        status: 'ACTIVE',
        displayOrder: 2,
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
    message: 'Mock data - Frontend only'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Mock create response
    return NextResponse.json({
      data: {
        id: Date.now().toString(),
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      message: 'Category created (Mock) - Frontend only'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

