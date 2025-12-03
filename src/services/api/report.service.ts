import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface Report {
  report_id: number;
  reporter_user_id: number;
  reported_user_id: number;
  report_type: string;
  report_description: string;
  report_status: "pending" | "resolved" | "dismissed";
  reviewed_by: number | null;
  reviewed_at: string | null;
  admin_notes: string | null;
  action_taken: string | null;
  reported_at: string;
  reporter_name: string | null;
  reporter_email: string | null;
  reporter_mobile: string | null;
  reported_name: string | null;
  reported_email: string | null;
  reported_mobile: string | null;
  reviewed_by_name: string | null;
}

export interface ReportDetails extends Report {
  profile_id: number | null;
  user_id: number | null;
  full_name: string | null;
  date_of_birth: string | null;
  age: number | null;
  gender: string | null;
  marital_status: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  body_type: string | null;
  complexion: string | null;
  highest_education: string | null;
  education_details: string | null;
  profession: string | null;
  occupation_details: string | null;
  annual_income: string | null;
  father_name: string | null;
  father_occupation: string | null;
  mother_name: string | null;
  mother_occupation: string | null;
  siblings: string | null;
  family_type: string | null;
  family_values: string | null;
  religion: string | null;
  caste: string | null;
  sub_caste: string | null;
  gotra: string | null;
  mother_tongue: string | null;
  diet: string | null;
  smoking: string | null;
  drinking: string | null;
  about_me: string | null;
  hobbies: string | null;
  interests: string | null;
  profile_visibility: string | null;
  profile_views: number | null;
  primary_photo_id: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ReviewReportData {
  report_id: number;
  action_taken: string; // e.g., "warning_sent", "profile_suspended", "profile_blocked", etc.
  admin_notes: string;
}

export interface ReportFilters {
  report_status?: "pending" | "resolved" | "dismissed";
  report_type?: string;
  page?: number;
  limit?: number;
}

// Reports Service
export const reportService = {
  // Get all reports
  getReports: async (filters?: ReportFilters): Promise<ApiResponse<Report[]>> => {
    return await apiClient.get(API_ENDPOINTS.REPORTS_LIST, filters);
  },

  // Get report details
  getReportDetails: async (reportId: number): Promise<ApiResponse<ReportDetails>> => {
    return await apiClient.get(API_ENDPOINTS.REPORT_DETAILS(reportId));
  },

  // Review report
  reviewReport: async (data: ReviewReportData): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.REPORT_REVIEW, data);
  },

  // Dismiss report
  dismissReport: async (reportId: number, reason: string): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.REPORT_DISMISS, {
      report_id: reportId,
      dismissal_reason: reason,
    });
  },
};

