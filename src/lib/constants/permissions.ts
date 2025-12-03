// Permission constants

export const PERMISSIONS = {
  // Categories
  CATEGORIES_VIEW: 'categories:view',
  CATEGORIES_CREATE: 'categories:create',
  CATEGORIES_UPDATE: 'categories:update',
  CATEGORIES_DELETE: 'categories:delete',
  
  // Businesses
  BUSINESSES_VIEW: 'businesses:view',
  BUSINESSES_CREATE: 'businesses:create',
  BUSINESSES_UPDATE: 'businesses:update',
  BUSINESSES_DELETE: 'businesses:delete',
  BUSINESSES_APPROVE: 'businesses:approve',
  BUSINESSES_REJECT: 'businesses:reject',
  BUSINESSES_SUSPEND: 'businesses:suspend',
  
  // Users
  USERS_VIEW: 'users:view',
  USERS_UPDATE: 'users:update',
  USERS_SUSPEND: 'users:suspend',
  
  // Payments
  PAYMENTS_VIEW: 'payments:view',
  PAYMENTS_REFUND: 'payments:refund',
  PAYMENTS_SETTLE: 'payments:settle',
  
  // Wallets
  WALLETS_VIEW: 'wallets:view',
  WALLETS_ADJUST: 'wallets:adjust',
  
  // Reports
  REPORTS_VIEW: 'reports:view',
  REPORTS_EXPORT: 'reports:export',
  
  // Support
  SUPPORT_VIEW: 'support:view',
  SUPPORT_RESOLVE: 'support:resolve',
  
  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
  
  // Notifications
  NOTIFICATIONS_SEND: 'notifications:send',
  
  // Super Admin only
  ADMINS_MANAGE: 'admins:manage',
  ROLES_MANAGE: 'roles:manage',
  SYSTEM_MANAGE: 'system:manage',
} as const;

export const MODULES = {
  DASHBOARD: 'dashboard',
  CATEGORIES: 'categories',
  BUSINESSES: 'businesses',
  USERS: 'users',
  PAYMENTS: 'payments',
  WALLETS: 'wallets',
  REPORTS: 'reports',
  SUPPORT: 'support',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
  ADMINS: 'admins',
  ROLES: 'roles',
  SYSTEM: 'system',
} as const;

