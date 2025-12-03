// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  TIMEOUT: 30000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  ADMIN_REGISTER: "/admin/register",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_LOGOUT: "/admin/logout",
  
  // Admin Profile
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_UPDATE_PROFILE: "/admin/profile",
  ADMIN_CHANGE_PASSWORD: "/admin/change-password",
  
  // Admin Management
  ADMINS_LIST: "/admin/admins",
  ADMIN_UPDATE_STATUS: "/admin/admin/status",
  
  // Dashboard
  DASHBOARD_STATS: "/admin/dashboard/stats",
  
  // User Management
  USERS_LIST: "/admin/users",
  USER_DETAILS: (userId: number) => `/admin/users/${userId}`,
  USER_ACTIVITY: (userId: number) => `/admin/users/${userId}/activity`,
  USER_APPROVE: "/admin/users/approve",
  USER_REJECT: "/admin/users/reject",
  USER_SUSPEND: "/admin/users/suspend",
  USER_BLOCK: "/admin/users/block",
  USER_UNBLOCK: "/admin/users/unblock",
  
  // Subscription Plans
  PLANS_LIST: "/admin/subscription-plans",
  PLAN_CREATE: "/admin/subscription-plans",
  PLAN_UPDATE: (planId: number) => `/admin/subscription-plans/${planId}`,
  PLAN_DELETE: (planId: number) => `/admin/subscription-plans/${planId}`,
  
  // Reports Management
  REPORTS_LIST: "/admin/reports",
  REPORT_DETAILS: (reportId: number) => `/admin/reports/${reportId}`,
  REPORT_REVIEW: "/admin/reports/review",
  REPORT_DISMISS: "/admin/reports/dismiss",
  
  // Documents Verification
  DOCUMENTS_PENDING: "/admin/documents/pending",
  DOCUMENT_VERIFY: "/admin/documents/verify",
};

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

