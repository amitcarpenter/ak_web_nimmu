import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";
import { generateToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Mock database - This should be replaced with actual database
// For demo, we'll create a default admin
const mockAdmins = [
  {
    id: 1,
    full_name: "Admin User",
    email: "admin@dholmatrimony.com",
    password: "$2a$10$8ZqN8vKZ8qN8vKZ8qN8vKO8qN8vKZ8qN8vKZ8qN8vKZ8qN8vKZ8q", // admin123
    role: "super_admin",
    status: "active",
    created_at: "2024-01-01T00:00:00.000Z",
    last_login: null as string | null,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return errorResponse("Email and password are required");
    }

    // Find admin
    const admin = mockAdmins.find((a) => a.email === email);
    if (!admin) {
      return errorResponse("Invalid email or password", 401);
    }

    // Check password (for demo, accept any password)
    // In production: const isValidPassword = await bcrypt.compare(password, admin.password);
    const isValidPassword = true; // Demo mode

    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    // Check if admin is active
    if (admin.status !== "active") {
      return errorResponse("Your account is inactive. Please contact administrator.", 403);
    }

    // Update last login
    admin.last_login = new Date().toISOString();

    // Generate token
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    // Return admin without password
    const { password: _, ...adminWithoutPassword } = admin;

    return successResponse(
      {
        admin: adminWithoutPassword,
        token,
      },
      "Login successful"
    );
  } catch (error: any) {
    return errorResponse(error.message || "Failed to login", 500);
  }
}



