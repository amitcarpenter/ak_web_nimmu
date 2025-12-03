import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91-9812345678",
    age: 28,
    city: "Delhi",
    profession: "Software Engineer",
    status: "pending_approval",
    subscription: null,
    created_at: "2024-11-26T10:30:00Z",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91-9823456789",
    age: 26,
    city: "Mumbai",
    profession: "Doctor",
    status: "approved",
    subscription: "Premium",
    created_at: "2024-11-25T14:20:00Z",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91-9834567890",
    age: 30,
    city: "Bangalore",
    profession: "Business Analyst",
    status: "approved",
    subscription: "Gold",
    created_at: "2024-11-24T09:15:00Z",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha@example.com",
    phone: "+91-9845678901",
    age: 25,
    city: "Pune",
    profession: "Teacher",
    status: "pending_approval",
    subscription: null,
    created_at: "2024-11-26T11:45:00Z",
  },
  {
    id: 5,
    name: "Vijay Kumar",
    email: "vijay@example.com",
    phone: "+91-9856789012",
    age: 32,
    city: "Chennai",
    profession: "Chartered Accountant",
    status: "suspended",
    subscription: "Basic",
    created_at: "2024-11-20T16:30:00Z",
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
    const accountStatus = searchParams.get("account_status");
    const matchesActivated = searchParams.get("matches_activated");
    const subscriptionStatus = searchParams.get("subscription_status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Filter users
    let filteredUsers = [...mockUsers];

    if (accountStatus) {
      filteredUsers = filteredUsers.filter((u) => u.status === accountStatus);
    }

    if (matchesActivated === "true") {
      filteredUsers = filteredUsers.filter((u) => u.subscription !== null);
    }

    if (subscriptionStatus) {
      filteredUsers = filteredUsers.filter((u) => u.subscription === subscriptionStatus);
    }

    // Pagination
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return successResponse(
      {
        users: paginatedUsers,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      "Users fetched successfully"
    );
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch users", 500);
  }
}









