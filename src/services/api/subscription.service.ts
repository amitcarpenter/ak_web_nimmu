import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface SubscriptionPlan {
  plan_id: number;
  plan_name: string;
  plan_description: string;
  duration_days: number;
  price: string;
  currency: string;
  max_matches_per_week: number;
  can_view_contact: number;
  can_send_unlimited_messages: number;
  profile_boost_count: number;
  can_see_who_viewed: number;
  can_see_who_accepted: number;
  premium_badge: number;
  is_active: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePlanData {
  plan_name: string;
  plan_description?: string;
  duration_days: number;
  price: number;
  max_matches_per_week: number;
  can_view_contact: boolean;
  can_send_unlimited_messages: boolean;
  profile_boost_count: number;
  can_see_who_viewed: boolean;
  can_see_who_accepted: boolean;
  premium_badge: boolean;
  display_order: number;
}

export interface UpdatePlanData {
  plan_name?: string;
  plan_description?: string;
  duration_days?: number;
  price?: number;
  max_matches_per_week?: number;
  can_view_contact?: boolean;
  can_send_unlimited_messages?: boolean;
  profile_boost_count?: number;
  can_see_who_viewed?: boolean;
  can_see_who_accepted?: boolean;
  premium_badge?: boolean;
  display_order?: number;
  is_active?: boolean;
}

// Subscription Plans Service
export const subscriptionService = {
  // Get all plans
  getPlans: async (): Promise<ApiResponse<SubscriptionPlan[]>> => {
    return await apiClient.get(API_ENDPOINTS.PLANS_LIST);
  },

  // Create plan
  createPlan: async (data: CreatePlanData): Promise<ApiResponse<SubscriptionPlan>> => {
    return await apiClient.post(API_ENDPOINTS.PLAN_CREATE, data);
  },

  // Update plan
  updatePlan: async (planId: number, data: UpdatePlanData): Promise<ApiResponse> => {
    return await apiClient.put(API_ENDPOINTS.PLAN_UPDATE(planId), data);
  },

  // Delete plan
  deletePlan: async (planId: number): Promise<ApiResponse> => {
    return await apiClient.delete(API_ENDPOINTS.PLAN_DELETE(planId));
  },

  // Deactivate plan
  deactivatePlan: async (planId: number): Promise<ApiResponse> => {
    return await apiClient.put(API_ENDPOINTS.PLAN_UPDATE(planId), {
      is_active: false,
    });
  },

  // Activate plan
  activatePlan: async (planId: number): Promise<ApiResponse> => {
    return await apiClient.put(API_ENDPOINTS.PLAN_UPDATE(planId), {
      is_active: true,
    });
  },
};

