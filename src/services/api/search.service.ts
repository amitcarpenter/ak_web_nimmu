import { apiClient } from "./client";
import { ApiResponse } from "./config";
import { userService, User } from "./user.service";
import { reportService, Report } from "./report.service";
import { subscriptionService, SubscriptionPlan } from "./subscription.service";

// Search Result Types
export interface SearchResult {
  id: string | number;
  type: 'user' | 'report' | 'plan' | 'document';
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  metadata?: Record<string, any>;
}

// Search Type Configuration
export interface SearchTypeConfig {
  type: 'user' | 'report' | 'plan' | 'document';
  label: string;
  icon?: string;
  searchHandler: (query: string) => Promise<SearchResult[]>;
  getUrl: (id: string | number) => string;
}

// Search Handlers
const searchUsers = async (query: string): Promise<SearchResult[]> => {
  try {
    // Get all users without limit to search through all
    const response = await userService.getUsers();
    
    console.log('Search Users - API Response:', response);
    
    if (!response.success || !response.data) {
      console.log('Search Users - No success or no data');
      return [];
    }

    // Handle both array and object response formats
    let users: User[] = [];
    if (Array.isArray(response.data)) {
      users = response.data;
      console.log('Search Users - Direct array format, count:', users.length);
    } else if (response.data && typeof response.data === 'object') {
      // Check for nested users array
      if (response.data.users && Array.isArray(response.data.users)) {
        users = response.data.users;
        console.log('Search Users - Nested users array, count:', users.length);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        users = response.data.data;
        console.log('Search Users - Nested data array, count:', users.length);
      } else {
        console.log('Search Users - Unknown data structure:', response.data);
        return [];
      }
    } else {
      console.log('Search Users - Data is not array or object');
      return [];
    }
    
    if (users.length === 0) {
      console.log('Search Users - No users found');
      return [];
    }
    
    // Client-side filtering
    const queryLower = query.toLowerCase().trim();
    
    // If query is "user" or "users", show first 5 users
    let filtered: User[] = [];
    if (queryLower === 'user' || queryLower === 'users' || queryLower.startsWith('user')) {
      filtered = users.slice(0, 5);
      console.log('Search Users - Showing all users (query matches "user"), count:', filtered.length);
    } else {
      // Otherwise, filter by search criteria
      filtered = users.filter((user: User) => {
        return (
          user.full_name?.toLowerCase().includes(queryLower) ||
          user.email?.toLowerCase().includes(queryLower) ||
          user.mobile_number?.includes(query) ||
          user.city?.toLowerCase().includes(queryLower)
        );
      }).slice(0, 5); // Limit to 5 results
      console.log('Search Users - Filtered by criteria, count:', filtered.length);
    }

    console.log('Search Users - Filtered results:', filtered.length);

    return filtered.map((user: User) => ({
      id: user.user_id,
      type: 'user' as const,
      title: user.full_name || user.email || `User #${user.user_id}`,
      subtitle: user.email,
      description: user.city ? `${user.city} • ${user.gender || ''}` : undefined,
      url: `/admin/users/${user.user_id}`,
      metadata: {
        account_status: user.account_status,
        mobile_number: user.mobile_number,
      },
    }));
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

const searchReports = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await reportService.getReports();
    
    if (!response.success || !response.data) {
      return [];
    }

    // Handle both array and object response formats
    let reports: Report[] = [];
    if (Array.isArray(response.data)) {
      reports = response.data;
    } else if (response.data.reports && Array.isArray(response.data.reports)) {
      reports = response.data.reports;
    } else {
      return [];
    }

    // Client-side filtering
    const searchLower = query.toLowerCase();
    const filtered = reports.filter((report: Report) => {
      return (
        report.report_type?.toLowerCase().includes(searchLower) ||
        report.report_description?.toLowerCase().includes(searchLower) ||
        report.reporter_name?.toLowerCase().includes(searchLower) ||
        report.reported_name?.toLowerCase().includes(searchLower) ||
        report.reporter_email?.toLowerCase().includes(searchLower) ||
        report.reported_email?.toLowerCase().includes(searchLower)
      );
    }).slice(0, 5);

    return filtered.map((report: Report) => ({
      id: report.report_id,
      type: 'report' as const,
      title: `${report.report_type || 'Report'} Report`,
      subtitle: `Reported by: ${report.reporter_name || report.reporter_email || 'Unknown'}`,
      description: report.report_description?.substring(0, 100),
      url: `/admin/reports/${report.report_id}`,
      metadata: {
        status: report.report_status,
        reported_at: report.reported_at,
      },
    }));
  } catch (error) {
    console.error('Error searching reports:', error);
    return [];
  }
};

const searchPlans = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await subscriptionService.getPlans();
    
    if (!response.success || !response.data) {
      return [];
    }

    // Handle both array and object response formats
    let plans: SubscriptionPlan[] = [];
    if (Array.isArray(response.data)) {
      plans = response.data;
    } else if (response.data.plans && Array.isArray(response.data.plans)) {
      plans = response.data.plans;
    } else {
      return [];
    }

    // Client-side filtering
    const searchLower = query.toLowerCase();
    const filtered = plans.filter((plan: SubscriptionPlan) => {
      return (
        plan.plan_name?.toLowerCase().includes(searchLower) ||
        plan.plan_description?.toLowerCase().includes(searchLower)
      );
    }).slice(0, 5);

    return filtered.map((plan: SubscriptionPlan) => ({
      id: plan.plan_id,
      type: 'plan' as const,
      title: plan.plan_name,
      subtitle: `${plan.currency} ${plan.price} • ${plan.duration_days} days`,
      description: plan.plan_description,
      url: `/admin/plans`,
      metadata: {
        is_active: plan.is_active,
        price: plan.price,
      },
    }));
  } catch (error) {
    console.error('Error searching plans:', error);
    return [];
  }
};

// Search Type Configurations - Easy to extend
export const SEARCH_TYPES: SearchTypeConfig[] = [
  {
    type: 'user',
    label: 'Users',
    searchHandler: searchUsers,
    getUrl: (id) => `/admin/users/${id}`,
  },
  {
    type: 'report',
    label: 'Reports',
    searchHandler: searchReports,
    getUrl: (id) => `/admin/reports/${id}`,
  },
  {
    type: 'plan',
    label: 'Plans',
    searchHandler: searchPlans,
    getUrl: () => `/admin/plans`,
  },
  // Add more search types here in the future
  // {
  //   type: 'document',
  //   label: 'Documents',
  //   searchHandler: searchDocuments,
  //   getUrl: (id) => `/admin/documents/${id}`,
  // },
];

// Global Search Service
export const searchService = {
  // Search across all types
  searchAll: async (query: string): Promise<SearchResult[]> => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      console.log('Search Service - Starting search for:', query);
      
      // Search all types in parallel
      const searchPromises = SEARCH_TYPES.map((config) =>
        config.searchHandler(query).catch((error) => {
          console.error(`Error searching ${config.type}:`, error);
          return [];
        })
      );

      const results = await Promise.all(searchPromises);
      console.log('Search Service - All results:', results);
      
      // Flatten and limit results
      const allResults = results.flat();
      console.log('Search Service - Flattened results:', allResults.length);
      
      // Sort by relevance (you can enhance this)
      const finalResults = allResults.slice(0, 10); // Limit to 10 results
      console.log('Search Service - Final results:', finalResults.length);
      
      return finalResults;
    } catch (error) {
      console.error('Error in global search:', error);
      return [];
    }
  },

  // Search specific type
  searchByType: async (type: string, query: string): Promise<SearchResult[]> => {
    const config = SEARCH_TYPES.find((t) => t.type === type);
    if (!config) {
      return [];
    }
    return config.searchHandler(query);
  },

  // Get all search types
  getSearchTypes: () => SEARCH_TYPES,
};

