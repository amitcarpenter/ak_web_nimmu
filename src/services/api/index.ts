// Export all API services
export * from "./config";
export * from "./client";
export * from "./admin.service";
export * from "./user.service";
export * from "./subscription.service";
export * from "./report.service";
export * from "./document.service";
export * from "./dashboard.service";

// Re-export commonly used services
export { apiClient } from "./client";
export { adminAuthService, adminProfileService, adminManagementService } from "./admin.service";
export { userService } from "./user.service";
export { subscriptionService } from "./subscription.service";
export { reportService } from "./report.service";
export { documentService } from "./document.service";
export { dashboardService } from "./dashboard.service";

