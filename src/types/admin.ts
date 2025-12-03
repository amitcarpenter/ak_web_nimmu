// Admin and Super Admin types

export type AdminStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  roleId: string;
  status: AdminStatus;
  lastLoginAt?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  
  role?: Role;
  permissions?: string[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  
  permissions?: Permission[];
}

export interface Permission {
  id: string;
  roleId: string;
  module: string;
  action: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  action: string;
  module: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  
  admin?: Admin;
}

