import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminRegisterData {
  full_name: string;
  email: string;
  password: string;
  role: "super_admin" | "admin" | "moderator";
}

export interface AdminProfile {
  admin_id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

// Admin Authentication Service
export const adminAuthService = {
  // Login
  login: async (credentials: AdminLoginData): Promise<ApiResponse<{
    token: string;
    admin: AdminProfile;
  }>> => {
    const response = await apiClient.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
    
    // Save token to localStorage
    if (response.data?.token) {
      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("admin_data", JSON.stringify(response.data.admin));
    }
    
    return response;
  },

  // Register
  register: async (data: AdminRegisterData): Promise<ApiResponse<AdminProfile>> => {
    return await apiClient.post(API_ENDPOINTS.ADMIN_REGISTER, data);
  },

  // Logout
  logout: () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_data");
    apiClient.removeAuthToken();
  },

  // Get current admin
  getCurrentAdmin: (): AdminProfile | null => {
    const adminData = localStorage.getItem("admin_data");
    return adminData ? JSON.parse(adminData) : null;
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("admin_token");
  },
};

// Admin Profile Service
export const adminProfileService = {
  // Get profile
  getProfile: async (): Promise<ApiResponse<AdminProfile>> => {
    return await apiClient.get(API_ENDPOINTS.ADMIN_PROFILE);
  },

  // Update profile
  updateProfile: async (data: { full_name: string }): Promise<ApiResponse<AdminProfile>> => {
    return await apiClient.put(API_ENDPOINTS.ADMIN_UPDATE_PROFILE, data);
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.ADMIN_CHANGE_PASSWORD, data);
  },
};

// Admin Management Service
export const adminManagementService = {
  // Get all admins
  getAdmins: async (): Promise<ApiResponse<AdminProfile[]>> => {
    return await apiClient.get(API_ENDPOINTS.ADMINS_LIST);
  },

  // Update admin status
  updateStatus: async (adminId: number, status: "active" | "inactive"): Promise<ApiResponse> => {
    return await apiClient.put(API_ENDPOINTS.ADMIN_UPDATE_STATUS, {
      admin_id: adminId,
      status,
    });
  },
};

