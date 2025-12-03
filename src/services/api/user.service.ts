import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface UserPhoto {
  photo_id: number;
  user_id: number;
  photo_url: string;
  photo_path: string;
  is_primary: number;
  is_verified: number;
  display_order: number;
  upload_date: string;
}

export interface UserDocument {
  document_id: number;
  user_id: number;
  document_type: string;
  document_number: string;
  document_url: string;
  document_path: string;
  verification_status: string;
  verified_by: number | null;
  verified_at: string | null;
  rejection_reason: string | null;
  is_encrypted: number;
  uploaded_at: string;
}

export interface UserKundli {
  kundli_id: number;
  user_id: number;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  birth_city: string;
  birth_state: string;
  birth_country: string;
  latitude: string;
  longitude: string;
  kundli_data: any;
  is_manglik: number;
  manglik_details: string;
  rashi: string;
  nakshatra: string;
  charan: number;
  gana: string;
  is_encrypted: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  profile_id: number;
  user_id: number;
  full_name: string;
  date_of_birth: string;
  age: number | null;
  gender: string;
  marital_status: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  height_cm: number;
  weight_kg: number;
  body_type: string;
  complexion: string;
  highest_education: string;
  education_details: string;
  profession: string;
  occupation_details: string;
  annual_income: string;
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  siblings: number;
  family_type: string;
  family_values: string;
  religion: string;
  caste: string;
  sub_caste: string;
  gotra: string;
  mother_tongue: string;
  diet: string;
  smoking: string;
  drinking: string;
  about_me: string;
  hobbies: string;
  interests: string;
  profile_visibility: string;
  profile_views: number;
  primary_photo_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  preference_id: number;
  user_id: number;
  min_age: number;
  max_age: number;
  min_height_cm: number;
  max_height_cm: number;
  preferred_cities: string;
  preferred_states: string;
  preferred_countries: string;
  preferred_education: string;
  preferred_profession: string;
  min_income: string;
  preferred_marital_status: string;
  preferred_religion: string;
  preferred_caste: string;
  preferred_mother_tongue: string;
  preferred_complexion: string;
  preferred_body_type: string;
  preferred_diet: string;
  preferred_smoking: string;
  preferred_drinking: string;
  preferred_family_type: string;
  preferred_family_values: string;
  require_kundli_match: number;
  min_kundli_score: number;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  subscription_id: number;
  user_id: number;
  plan_id: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  payment_id: number;
  amount_paid: string;
  currency: string;
  promo_code: string | null;
  discount_amount: string;
  referred_by: number | null;
  auto_renew: number;
  created_at: string;
  updated_at: string;
  plan_name: string;
  plan_description: string;
  duration_days: number;
}

export interface User {
  user_id: number;
  email: string;
  mobile_number: string;
  password_hash: string | null;
  temp_password_token: string | null;
  temp_password_expiry: string | null;
  is_password_changed: number;
  account_status: string;
  approved_by: number | null;
  approved_at: string | null;
  rejection_reason: string | null;
  biometric_enabled: number;
  biometric_type: string | null;
  otp_code: string | null;
  otp_expiry: string | null;
  otp_attempts: number;
  profile_completed: number;
  preferences_completed: number;
  birth_details_completed: number;
  matches_activated: number;
  last_login: string | null;
  login_count: number;
  failed_login_attempts: number;
  account_locked_until: string | null;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  age: number | null;
  gender: string | null;
  city: string | null;
  subscription_status: string | null;
  // Additional fields from detailed response
  photo_count?: number;
  document_count?: number;
  kundli_count?: number;
  photos_uploaded?: number;
  documents_submitted?: number;
  kundli_data_filled?: number;
  profile?: UserProfile;
  photos?: UserPhoto[];
  documents?: UserDocument[];
  kundli?: UserKundli;
  preferences?: UserPreferences;
  subscriptions?: UserSubscription[];
}

export interface UserDetails extends User {
  // Personal
  dob: string;
  gender: string;
  marital_status: string;
  religion: string;
  caste: string;
  mother_tongue: string;
  height: string;
  weight: string;
  body_type: string;
  complexion: string;
  physical_status: string;
  blood_group: string;
  
  // Family
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  siblings: string;
  family_type: string;
  family_status: string;
  family_location: string;
  
  // Professional
  education: string;
  college: string;
  occupation: string;
  company: string;
  income: string;
  work_location: string;
  
  // Preferences
  partner_age_range: string;
  partner_height: string;
  partner_marital: string;
  partner_religion: string;
  partner_caste: string;
  partner_education: string;
  partner_occupation: string;
  partner_location: string;
  
  // Subscription
  subscription_plan: string;
  subscription_status: string;
  subscription_start: string;
  subscription_end: string;
  payment_amount: string;
  transaction_id: string;
}

export interface UserActivity {
  id: number;
  action: string;
  timestamp: string;
  details: string;
}

export interface UserFilters {
  account_status?: string;
  matches_activated?: boolean;
  subscription_status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// User Management Service
export const userService = {
  // Get all users with filters
  getUsers: async (filters?: UserFilters): Promise<ApiResponse<User[]>> => {
    return await apiClient.get(API_ENDPOINTS.USERS_LIST, filters);
  },

  // Get user details
  getUserDetails: async (userId: number): Promise<ApiResponse<UserDetails>> => {
    return await apiClient.get(API_ENDPOINTS.USER_DETAILS(userId));
  },

  // Get user activity
  getUserActivity: async (userId: number, limit: number = 50): Promise<ApiResponse<UserActivity[]>> => {
    return await apiClient.get(API_ENDPOINTS.USER_ACTIVITY(userId), { limit });
  },

  // Approve user
  approveUser: async (userId: number): Promise<ApiResponse<{
    user_id: number;
    email: string;
    temp_password: string;
    temp_token: string;
    message: string;
  }>> => {
    return await apiClient.post(API_ENDPOINTS.USER_APPROVE, { user_id: userId });
  },

  // Reject user
  rejectUser: async (userId: number, rejection_reason: string): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.USER_REJECT, {
      user_id: userId,
      rejection_reason: rejection_reason,
    });
  },

  // Suspend user
  suspendUser: async (userId: number): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.USER_SUSPEND, {
      user_id: userId,
    });
  },

  // Block user
  blockUser: async (userId: number): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.USER_BLOCK, {
      user_id: userId,
    });
  },

  // Unblock user
  unblockUser: async (userId: number): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.USER_UNBLOCK, { user_id: userId });
  },
};

