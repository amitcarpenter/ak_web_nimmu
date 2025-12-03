// Business types

export type BusinessStatus = 
  | 'PENDING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'SUSPENDED' 
  | 'DELETED';

export interface BusinessFieldValue {
  categoryFieldId: string;
  value: any;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  gstNumber?: string;
  licenseNumber?: string;
  status: BusinessStatus;
  rejectionReason?: string;
  rating: number;
  totalRatings: number;
  storefrontImage?: string;
  logo?: string;
  photos: string[];
  kycDocuments?: {
    idProof?: string;
    businessProof?: string;
  };
  qrCodeStatic?: string;
  qrCodeEnabled: boolean;
  openingHours?: Record<string, { open: string; close: string; closed?: boolean }>;
  is24x7: boolean;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  
  // Relations
  owner?: any;
  category?: any;
  fields?: BusinessFieldValue[];
  stats?: {
    totalTransactions: number;
    totalRevenue: number;
    walletBalance: number;
  };
}

export interface BusinessFormData {
  name: string;
  categoryId: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  gstNumber?: string;
  licenseNumber?: string;
  storefrontImage?: File | string;
  logo?: File | string;
  photos?: (File | string)[];
  kycDocuments?: {
    idProof?: File | string;
    businessProof?: File | string;
  };
  openingHours?: Record<string, { open: string; close: string; closed?: boolean }>;
  is24x7?: boolean;
  fields: Record<string, any>;
}

