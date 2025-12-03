import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock user details
const mockUserDetails: Record<number, any> = {
  1: {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91-9812345678",
    age: 28,
    dob: "1995-05-15",
    gender: "Male",
    city: "Delhi",
    marital_status: "Never Married",
    religion: "Hindu",
    caste: "Brahmin",
    mother_tongue: "Hindi",
    height: "5'10\"",
    weight: "75 kg",
    profession: "Software Engineer",
    company: "Tech Corp",
    income: "₹12-15 LPA",
    education: "B.Tech in Computer Science",
    status: "pending_approval",
    subscription: null,
    created_at: "2024-11-26T10:30:00Z",
    // Family details
    father_name: "Mr. Sharma",
    father_occupation: "Business",
    mother_name: "Mrs. Sharma",
    mother_occupation: "Homemaker",
    siblings: "1 Brother",
    // Preferences
    partner_age_range: "24-30",
    partner_height: "5'4\" - 5'8\"",
    partner_education: "Graduate or above",
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

    const userId = parseInt(params.id);
    const userDetails = mockUserDetails[userId];

    if (!userDetails) {
      return notFoundResponse("User not found");
    }

    return successResponse(userDetails, "User details fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch user details", 500);
  }
}









