import { NextRequest } from "next/server";
import { successResponse, errorResponse, unauthorizedResponse } from "@/lib/api-response";
import { authenticateAdmin } from "@/lib/auth";

// Mock subscription plans
let mockPlans = [
  {
    id: 1,
    plan_name: "Basic Plan",
    plan_description: "Basic features for getting started",
    duration_days: 30,
    price: 499,
    max_matches_per_week: 10,
    can_view_contact: true,
    can_send_unlimited_messages: false,
    profile_boost_count: 1,
    can_see_who_viewed: false,
    can_see_who_accepted: false,
    premium_badge: false,
    display_order: 1,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    plan_name: "Gold Plan",
    plan_description: "Enhanced features for serious matchmaking",
    duration_days: 60,
    price: 1499,
    max_matches_per_week: 18,
    can_view_contact: true,
    can_send_unlimited_messages: true,
    profile_boost_count: 3,
    can_see_who_viewed: true,
    can_see_who_accepted: false,
    premium_badge: false,
    display_order: 2,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    plan_name: "Premium Plan",
    plan_description: "Premium plan with advanced matching",
    duration_days: 90,
    price: 2999,
    max_matches_per_week: 25,
    can_view_contact: true,
    can_send_unlimited_messages: true,
    profile_boost_count: 5,
    can_see_who_viewed: true,
    can_see_who_accepted: true,
    premium_badge: true,
    display_order: 3,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
  },
];

let planIdCounter = 4;

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    return successResponse(mockPlans, "Subscription plans fetched successfully");
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch subscription plans", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = authenticateAdmin(request);
    if (!admin) {
      return unauthorizedResponse("Please login to access this resource");
    }

    const body = await request.json();
    const {
      plan_name,
      plan_description,
      duration_days,
      price,
      max_matches_per_week,
      can_view_contact,
      can_send_unlimited_messages,
      profile_boost_count,
      can_see_who_viewed,
      can_see_who_accepted,
      premium_badge,
      display_order,
    } = body;

    // Validation
    if (!plan_name || !duration_days || price === undefined || !max_matches_per_week) {
      return errorResponse("Required fields are missing");
    }

    // Create new plan
    const newPlan = {
      id: planIdCounter++,
      plan_name,
      plan_description: plan_description || "",
      duration_days,
      price,
      max_matches_per_week,
      can_view_contact: can_view_contact ?? false,
      can_send_unlimited_messages: can_send_unlimited_messages ?? false,
      profile_boost_count: profile_boost_count || 0,
      can_see_who_viewed: can_see_who_viewed ?? false,
      can_see_who_accepted: can_see_who_accepted ?? false,
      premium_badge: premium_badge ?? false,
      display_order: display_order || mockPlans.length + 1,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    mockPlans.push(newPlan);

    return successResponse(newPlan, "Subscription plan created successfully", 201);
  } catch (error: any) {
    return errorResponse(error.message || "Failed to create subscription plan", 500);
  }
}









