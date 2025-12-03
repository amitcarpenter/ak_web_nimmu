import { apiClient } from "./client";
import { API_ENDPOINTS, ApiResponse } from "./config";

// Types
export interface Document {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  document_type: string;
  document_number: string;
  document_url: string;
  verification_status: "pending" | "approved" | "rejected";
  rejection_reason: string | null;
  verified_by: number | null;
  verified_at: string | null;
  uploaded_at: string;
}

export interface VerifyDocumentData {
  document_id: number;
  verification_status: "approved" | "rejected";
  rejection_reason?: string;
}

// Documents Service
export const documentService = {
  // Get pending documents
  getPendingDocuments: async (): Promise<ApiResponse<Document[]>> => {
    return await apiClient.get(API_ENDPOINTS.DOCUMENTS_PENDING);
  },

  // Verify document (approve or reject)
  verifyDocument: async (data: VerifyDocumentData): Promise<ApiResponse> => {
    return await apiClient.post(API_ENDPOINTS.DOCUMENT_VERIFY, data);
  },

  // Approve document
  approveDocument: async (documentId: number): Promise<ApiResponse> => {
    return await documentService.verifyDocument({
      document_id: documentId,
      verification_status: "approved",
    });
  },

  // Reject document
  rejectDocument: async (documentId: number, reason: string): Promise<ApiResponse> => {
    return await documentService.verifyDocument({
      document_id: documentId,
      verification_status: "rejected",
      rejection_reason: reason,
    });
  },
};

