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
    const { report_id, action_taken, admin_notes } = body;

    // Validation
    if (!report_id || !action_taken) {
      return errorResponse("Report ID and action are required");
    }

    // Validate action type
    const validActions = ["none", "warning_sent", "profile_suspended", "profile_blocked", "profile_deleted"];
    if (!validActions.includes(action_taken)) {
      return errorResponse("Invalid action type");
    }

    // In production: Update report in database, take action on reported user, send notifications
    const response = {
      report_id,
      status: "resolved",
      action_taken,
      admin_notes: admin_notes || "",
      reviewed_by: admin.id,
      reviewed_at: new Date().toISOString(),
    };

    return successResponse(response, "Report reviewed successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to review report", 500);
  }
}









