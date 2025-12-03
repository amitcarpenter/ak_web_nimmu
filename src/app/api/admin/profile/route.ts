import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock admin data
const mockAdmin = {
  id: 1,
  full_name: "Admin User",
  email: "admin@dholmatrimony.com",
  role: "super_admin",
  status: "active",
  created_at: "2024-01-01T00:00:00.000Z",
  last_login: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    // Return admin profile (in production, fetch from database)
    return successResponse(mockAdmin, "Profile fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch profile", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    const body = await request.json();
    const { full_name } = body;

    // Validation
    if (!full_name) {
      return errorResponse("Full name is required");
    }

    // Update admin profile (in production, update in database)
    const updatedAdmin = {
      ...mockAdmin,
      full_name,
      updated_at: new Date().toISOString(),
    };

    return successResponse(updatedAdmin, "Profile updated successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to update profile", 500);
  }
}



