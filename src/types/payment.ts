// Payment and Transaction types

export type PaymentMethod = 'WALLET' | 'CARD' | 'UPI' | 'NETBANKING';
export type TransactionStatus = 
  | 'PENDING' 
  | 'SUCCESS' 
  | 'FAILED' 
  | 'REFUNDED' 
  | 'CANCELLED';
export type QrType = 'STATIC' | 'DYNAMIC';

export interface Transaction {
  id: string;
  userId: string;
  businessId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  transactionId: string;
  qrType: QrType;
  qrCode?: string;
  description?: string;
  metadata?: Record<string, any>;
  failureReason?: string;
  refundedAt?: string;
  refundReason?: string;
  refundedBy?: string;
  createdAt: string;
  updatedAt: string;
  
  user?: any;
  business?: any;
}

