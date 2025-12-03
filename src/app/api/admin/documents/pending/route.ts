import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock pending documents
const mockDocuments = [
  {
    id: 1,
    user_id: 1,
    user_name: "Rahul Sharma",
    user_email: "rahul@example.com",
    document_type: "Aadhar Card",
    document_number: "XXXX-XXXX-1234",
    document_url: "/uploads/documents/aadhar_1.jpg",
    verification_status: "pending",
    rejection_reason: null,
    verified_by: null,
    verified_at: null,
    uploaded_at: "2024-11-26T08:30:00Z",
  },
  {
    id: 2,
    user_id: 2,
    user_name: "Priya Patel",
    user_email: "priya@example.com",
    document_type: "PAN Card",
    document_number: "ABCDE1234F",
    document_url: "/uploads/documents/pan_2.jpg",
    verification_status: "pending",
    rejection_reason: null,
    verified_by: null,
    verified_at: null,
    uploaded_at: "2024-11-26T03:15:00Z",
  },
  {
    id: 3,
    user_id: 3,
    user_name: "Amit Kumar",
    user_email: "amit@example.com",
    document_type: "Passport",
    document_number: "A12345678",
    document_url: "/uploads/documents/passport_3.jpg",
    verification_status: "pending",
    rejection_reason: null,
    verified_by: null,
    verified_at: null,
    uploaded_at: "2024-11-25T18:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    return successResponse(mockDocuments, "Pending documents fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch pending documents", 500);
  }
}









