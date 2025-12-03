import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    const body = await request.json();
    const { user_id, rejection_reason } = body;

    // Validation
    if (!user_id || !rejection_reason) {
      return errorResponse("User ID and rejection reason are required");
    }

    // In production: Update user status in database, send rejection email
    const response = {
      user_id,
      status: "rejected",
      rejection_reason,
      rejected_at: new Date().toISOString(),
      rejected_by: admin.id,
    };

    return successResponse(response, "User rejected successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to reject user", 500);
  }
}









