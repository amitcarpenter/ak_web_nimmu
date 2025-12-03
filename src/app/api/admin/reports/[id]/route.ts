import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock report details
const mockReportDetails: Record<number, any> = {
  234: {
    id: 234,
    status: "pending",
    priority: "high",
    reported_at: "26/11/2024, 10:30 AM",
    type: "Harassment & Abuse",
    reporter: {
      id: 2,
      name: "Priya Patel",
      age: 26,
      city: "Mumbai",
      email: "priya@example.com",
      phone: "+91-9823456789",
    },
    reported_user: {
      id: 3,
      name: "Amit Kumar",
      age: 30,
      city: "Bangalore",
      email: "amit@example.com",
      phone: "+91-9834567890",
      previous_reports: 2,
      account_status: "Approved (1 previous warning)",
      join_date: "15/08/2024",
      last_active: "Today, 8:45 AM",
      messages_sent: 245,
      matches: 12,
    },
    description: "This user has been sending inappropriate messages and making me uncomfortable. Despite blocking him, he created multiple fake profiles to contact me.",
    evidence: ["Screenshot 1", "Screenshot 2", "Screenshot 3"],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    const reportId = parseInt(params.id);
    const reportDetails = mockReportDetails[reportId];

    if (!reportDetails) {
      return notFoundResponse("Report not found");
    }

    return successResponse(reportDetails, "Report details fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch report details", 500);
  }
}









