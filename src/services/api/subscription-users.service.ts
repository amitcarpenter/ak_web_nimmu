import { apiClient } from "./client";
import { ApiResponse } from "./config";

// Types
export interface SubscriptionUser {
  subscription_id: number;
  user_id: number;
  plan_id: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  payment_id: number | null;
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
  plan_price: string;
  email: string;
  mobile_number: string;
  account_status: string;
  full_name: string | null;
  payment_gateway: string | null;
  gateway_transaction_id: string | null;
  payment_status: string | null;
  transaction_amount: string | null;
  payment_completed_at: string | null;
}

export interface SubscriptionDetails extends SubscriptionUser {
  price: string;
  max_matches_per_week: number;
  can_view_contact: number;
  can_send_unlimited_messages: number;
  profile_boost_count: number;
  can_see_who_viewed: number;
  can_see_who_accepted: number;
  premium_badge: number;
  is_active: number;
  display_order: number;
  transaction_id: number | null;
  gateway_order_id: string | null;
  amount: string;
  payment_method: string | null;
  initiated_at: string | null;
  completed_at: string | null;
  gateway_response: any;
  failure_reason: string | null;
}

export interface SubscriptionStatistics {
  total_subscriptions: number;
  active_subscriptions: number;
  pending_subscriptions: number;
  expired_subscriptions: number;
  cancelled_subscriptions: number;
  total_revenue: string;
  total_revenue_all_time: string;
  expiring_soon: number;
}

export interface SubscriptionUpdateData {
  status?: string;
  start_date?: string;
  end_date?: string;
  auto_renew?: boolean;
}

export interface PaymentTransaction {
  transaction_id: number;
  user_id: number;
  subscription_id: number;
  payment_gateway: string;
  gateway_transaction_id: string | null;
  gateway_order_id: string | null;
  amount: string;
  currency: string;
  payment_status: string;
  payment_method: string | null;
  initiated_at: string | null;
  completed_at: string | null;
  gateway_response: any;
  failure_reason: string | null;
  email: string;
  mobile_number: string;
  full_name: string | null;
  plan_name: string;
}

export interface SubscriptionsResponse {
  subscriptions: SubscriptionUser[];
  pagination: {
    page: number;
    limit: number;
    offset: number;
  };
}

export interface TransactionsResponse {
  transactions: PaymentTransaction[];
  pagination: {
    page: number;
    limit: number;
    offset: number;
  };
}

// Subscription Users Service
export const subscriptionUsersService = {
  // Get all subscriptions
  getSubscriptions: async (): Promise<ApiResponse<SubscriptionsResponse>> => {
    return await apiClient.get("/admin/subscriptions");
  },

  // Get subscription statistics
  getStatistics: async (): Promise<ApiResponse<SubscriptionStatistics>> => {
    return await apiClient.get("/admin/subscriptions/statistics");
  },

  // Get expiring subscriptions
  getExpiringSubscriptions: async (): Promise<ApiResponse<SubscriptionUser[]>> => {
    return await apiClient.get("/admin/subscriptions/expiring");
  },

  // Get subscription details
  getSubscriptionDetails: async (subscriptionId: number): Promise<ApiResponse<SubscriptionDetails>> => {
    return await apiClient.get(`/admin/subscriptions/${subscriptionId}`);
  },

  // Update subscription
  updateSubscription: async (
    subscriptionId: number,
    data: SubscriptionUpdateData
  ): Promise<ApiResponse<SubscriptionDetails>> => {
    return await apiClient.put(`/admin/subscriptions/${subscriptionId}`, data);
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId: number): Promise<ApiResponse> => {
    return await apiClient.post(`/admin/subscriptions/${subscriptionId}/cancel`);
  },

  // Activate subscription
  activateSubscription: async (subscriptionId: number): Promise<ApiResponse<SubscriptionDetails>> => {
    return await apiClient.post(`/admin/subscriptions/${subscriptionId}/activate`);
  },

  // Get payment transactions
  getTransactions: async (): Promise<ApiResponse<TransactionsResponse>> => {
    return await apiClient.get("/admin/subscriptions/transactions");
  },
};


