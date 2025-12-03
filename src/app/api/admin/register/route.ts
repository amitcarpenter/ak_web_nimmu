import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";
import { generateToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Mock database - Replace with actual database
let admins: any[] = [];
let adminIdCounter = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password, role } = body;

    // Validation
    if (!full_name || !email || !password || !role) {
      return errorResponse("All fields are required");
    }

    // Validate role
    const validRoles = ["super_admin", "admin", "moderator"];
    if (!validRoles.includes(role)) {
      return errorResponse("Invalid role. Must be: super_admin, admin, or moderator");
    }

    // Check if admin already exists
    const existingAdmin = admins.find((a) => a.email === email);
    if (existingAdmin) {
      return errorResponse("Admin with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = {
      id: adminIdCounter++,
      full_name,
      email,
      password: hashedPassword,
      role,
      status: "active",
      created_at: new Date().toISOString(),
      last_login: null,
    };

    admins.push(newAdmin);

    // Generate token
    const token = generateToken({
      id: newAdmin.id,
      email: newAdmin.email,
      role: newAdmin.role,
    });

    // Return admin without password
    const { password: _, ...adminWithoutPassword } = newAdmin;

    return successResponse(
      {
        admin: adminWithoutPassword,
        token,
      },
      "Admin registered successfully",
      201
    );
  } catch (error: any) {
    return errorResponse(error.message || "Failed to register admin", 500);
  }
}



