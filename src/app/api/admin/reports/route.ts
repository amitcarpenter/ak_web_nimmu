import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock reports data
const mockReports = [
  {
    id: 234,
    reporter_id: 2,
    reporter_name: "Priya Patel",
    reported_user_id: 3,
    reported_user_name: "Amit Kumar",
    report_type: "Harassment & Abuse",
    report_description: "This user has been sending inappropriate messages",
    report_status: "pending",
    action_taken: null,
    admin_notes: null,
    created_at: "2024-11-26T10:30:00Z",
    resolved_at: null,
  },
  {
    id: 235,
    reporter_id: 1,
    reporter_name: "Rahul Sharma",
    reported_user_id: 4,
    reported_user_name: "Sneha Gupta",
    report_type: "Fake Profile",
    report_description: "Profile information seems fake",
    report_status: "pending",
    action_taken: null,
    admin_notes: null,
    created_at: "2024-11-25T14:15:00Z",
    resolved_at: null,
  },
  {
    id: 236,
    reporter_id: 4,
    reporter_name: "Sneha Gupta",
    reported_user_id: 5,
    reported_user_name: "Vijay Kumar",
    report_type: "Inappropriate Behavior",
    report_description: "Behaving inappropriately in messages",
    report_status: "resolved",
    action_taken: "warning_sent",
    admin_notes: "Warning issued to the user",
    created_at: "2024-11-24T09:20:00Z",
    resolved_at: "2024-11-25T10:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const reportStatus = searchParams.get("report_status");
    const reportType = searchParams.get("report_type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Filter reports
    let filteredReports = [...mockReports];

    if (reportStatus) {
      filteredReports = filteredReports.filter((r) => r.report_status === reportStatus);
    }

    if (reportType) {
      filteredReports = filteredReports.filter((r) => r.report_type === reportType);
    }

    // Pagination
    const total = filteredReports.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReports = filteredReports.slice(startIndex, endIndex);

    return successResponse(
      {
        reports: paginatedReports,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      "Reports fetched successfully"
    );
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch reports", 500);
  }
}









