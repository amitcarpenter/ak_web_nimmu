import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    // Mock dashboard statistics (replace with actual database queries)
    const stats = {
      total_users: 1245,
      pending_users: 45,
      approved_users: 1150,
      blocked_users: 50,
      active_subscriptions: 850,
      subscription_revenue: 2548500,
      todays_matches: 145,
      total_mutual_matches: 67,
      pending_reports: 12,
      pending_documents: 28,
      new_users_today: 12,
      approved_users_today: 8,
    };

    return successResponse(stats, "Dashboard statistics fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch dashboard statistics", 500);
  }
}









