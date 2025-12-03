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
    const { user_id } = body;

    // Validation
    if (!user_id) {
      return errorResponse("User ID is required");
    }

    // Generate temporary password and token
    const tempPassword = `Temp@${Math.random().toString(36).slice(-8)}`;
    const tempToken = `temp_${Math.random().toString(36).substring(2, 15)}`;

    // In production: Update user status in database, send email with credentials
    const response = {
      user_id,
      status: "approved",
      temp_password: tempPassword,
      temp_token: tempToken,
      message: "User approved successfully. Temporary credentials generated.",
    };

    return successResponse(response, "User approved successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to approve user", 500);
  }
}









