import { API_CONFIG, ApiResponse, ApiError } from "./config";

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;
  
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.headers = { ...API_CONFIG.HEADERS };
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.headers["Authorization"] = `Bearer ${token}`;
  }

  // Remove authentication token
  removeAuthToken() {
    delete this.headers["Authorization"];
  }

  // Get token from localStorage
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      // Check for admin_token first, then fallback to token
      return localStorage.getItem("admin_token") || localStorage.getItem("token");
    }
    return null;
  }

  // Generic request handler
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: HeadersInit = { ...this.headers };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      // Check if response is not ok (4xx, 5xx status codes)
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "An error occurred",
          errors: data.errors,
        } as ApiError;
      }

      // Also check if API returned success: false even with 200 status
      if (data.success === false) {
        throw {
          status: data.status || response.status,
          message: data.message || "An error occurred",
          errors: data.errors,
        } as ApiError;
      }

      return data;
    } catch (error: any) {
      // Network or parsing error
      if (!error.status) {
        throw {
          status: 500,
          message: error.message || "Network error occurred",
        } as ApiError;
      }
      throw error;
    }
  }

  // GET request
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.request<T>(url, {
      method: "GET",
    });
  }

  // POST request
  async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

