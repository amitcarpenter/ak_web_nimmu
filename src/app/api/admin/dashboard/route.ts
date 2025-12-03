import { NextResponse } from 'next/server';

// Frontend-only mock data - No backend required
export async function GET() {
  // Mock data for frontend development
  return NextResponse.json({
    data: {
      totalUsers: 1250,
      totalBusinesses: 342,
      pendingApprovals: 12,
      todayTransactions: { count: 156, amount: 125000 },
      totalRevenue: 2500000,
      activeBusinesses: 298,
      inactiveBusinesses: 44,
      recentActivity: [],
      chartData: {
        transactions: [],
        revenue: [],
        businesses: []
      }
    },
    message: 'Mock data - Frontend only'
  });
}

