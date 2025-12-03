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
    const { document_id, verification_status, rejection_reason } = body;

    // Validation
    if (!document_id || !verification_status) {
      return errorResponse("Document ID and verification status are required");
    }

    // Validate status
    if (!["approved", "rejected"].includes(verification_status)) {
      return errorResponse("Invalid verification status. Must be 'approved' or 'rejected'");
    }

    // Check rejection reason for rejected status
    if (verification_status === "rejected" && !rejection_reason) {
      return errorResponse("Rejection reason is required when rejecting document");
    }

    // In production: Update document in database, send notification to user
    const response = {
      document_id,
      verification_status,
      rejection_reason: verification_status === "rejected" ? rejection_reason : null,
      verified_by: admin.id,
      verified_at: new Date().toISOString(),
    };

    const message = verification_status === "approved"
      ? "Document approved successfully"
      : "Document rejected successfully";

    return successResponse(response, message);
  } catch (error: any) {
    return errorResponse(error.message || "Failed to verify document", 500);
  }
}









