import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface DashboardStats {
  total_users: number;
  pending_users: number;
  approved_users: number;
  active_subscriptions: number;
  todays_matches: number;
  total_mutual_matches: number;
  pending_reports: number;
}

export interface RecentActivity {
  id: number;
  action_type: string;
  description: string;
  timestamp: string;
  user_name?: string;
  user_id?: number;
}

// Dashboard Service
export const dashboardService = {
  // Get dashboard statistics
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    return await apiClient.get(API_ENDPOINTS.DASHBOARD_STATS);
  },

  // Get recent activities (if separate endpoint exists)
  getRecentActivities: async (limit: number = 10): Promise<ApiResponse<RecentActivity[]>> => {
    return await apiClient.get(`${API_ENDPOINTS.DASHBOARD_STATS}/activities`, { limit });
  },
};

