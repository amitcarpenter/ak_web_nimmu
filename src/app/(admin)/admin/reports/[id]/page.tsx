'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { reportService, ReportDetails, ReviewReportData } from '@/services/api/report.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params?.id ? parseInt(params.id as string) : null;

  const [report, setReport] = useState<ReportDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewReportData>({
    report_id: 0,
    action_taken: '',
    admin_notes: '',
  });
  const [reviewing, setReviewing] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    type: 'info',
  });

  // Fetch report details
  const fetchReportDetails = async () => {
    if (!reportId) {
      setError('Invalid report ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await reportService.getReportDetails(reportId);
      
      if (response.success && response.data) {
        setReport(response.data);
        setReviewData({
          report_id: response.data.report_id,
          action_taken: '',
          admin_notes: '',
        });
      } else {
        setError(response.message || 'Failed to fetch report details');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching report details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportDetails();
  }, [reportId]);

  // Handle review
  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewData.action_taken.trim()) {
      setToast({
        open: true,
        message: 'Please select an action',
        type: 'error',
      });
      return;
    }

    if (!reviewData.admin_notes.trim()) {
      setToast({
        open: true,
        message: 'Please provide admin notes',
        type: 'error',
      });
      return;
    }

    try {
      setReviewing(true);
      const response = await reportService.reviewReport(reviewData);
      
      if (response.success) {
        setToast({
          open: true,
          message: 'Report reviewed successfully',
          type: 'success',
        });
        setReviewModal(false);
        fetchReportDetails(); // Refresh report details
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to review report',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while reviewing report',
        type: 'error',
      });
    } finally {
      setReviewing(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format report type
  const formatReportType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <>
        <Breadcrumb pageName="Report Details" />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhol-500 border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading report details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !report) {
    return (
      <>
        <Breadcrumb pageName="Report Details" />
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error || 'Report not found'}</p>
          <Link
            href="/admin/reports"
            className="mt-2 inline-block text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            ← Back to Reports
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumb pageName={`Report #${report.report_id}`} />
        <Link
          href="/admin/reports"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← Back to Reports
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Information */}
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h2 className="mb-6 text-heading-5 font-bold text-dark dark:text-white">
              Report Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Report ID:</span>
                <span className="text-body-sm font-bold text-primary">#{report.report_id}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Report Type:</span>
                <span className="text-body-sm text-dark dark:text-white">{formatReportType(report.report_type)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Status:</span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  report.report_status === 'pending' 
                    ? 'bg-yellow-light-4 text-yellow-dark' 
                    : report.report_status === 'resolved'
                    ? 'bg-green-light-7 text-green'
                    : 'bg-gray-2 text-dark-4'
                }`}>
                  {report.report_status === 'pending' ? '🔴 Pending' : report.report_status === 'resolved' ? '✅ Resolved' : '❌ Dismissed'}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Reported At:</span>
                <span className="text-body-sm text-dark dark:text-white">{formatDate(report.reported_at)}</span>
              </div>
              {report.report_description && (
                <div className="border-b border-stroke pb-3 dark:border-strokedark">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Description:</span>
                  <p className="mt-2 text-body-sm text-dark dark:text-white">{report.report_description}</p>
                </div>
              )}
              {report.action_taken && (
                <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Action Taken:</span>
                  <span className="text-body-sm text-dark dark:text-white">{formatReportType(report.action_taken)}</span>
                </div>
              )}
              {report.admin_notes && (
                <div className="border-b border-stroke pb-3 dark:border-strokedark">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Admin Notes:</span>
                  <p className="mt-2 text-body-sm text-dark dark:text-white">{report.admin_notes}</p>
                </div>
              )}
              {report.reviewed_at && (
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Reviewed At:</span>
                  <span className="text-body-sm text-dark dark:text-white">{formatDate(report.reviewed_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Information */}
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h2 className="mb-6 text-heading-5 font-bold text-dark dark:text-white">
              Reporter Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Name:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reporter_name || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Email:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reporter_email || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Mobile:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reporter_mobile || 'N/A'}</span>
              </div>
              {report.reporter_user_id && (
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">User ID:</span>
                  <Link
                    href={`/admin/users/${report.reporter_user_id}`}
                    className="text-body-sm font-medium text-primary hover:underline"
                  >
                    #{report.reporter_user_id}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Reported User Information */}
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h2 className="mb-6 text-heading-5 font-bold text-dark dark:text-white">
              Reported User Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Name:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reported_name || report.full_name || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Email:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reported_email || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">Mobile:</span>
                <span className="text-body-sm text-dark dark:text-white">{report.reported_mobile || 'N/A'}</span>
              </div>
              {report.reported_user_id && (
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium text-dark-4 dark:text-dark-6">User ID:</span>
                  <Link
                    href={`/admin/users/${report.reported_user_id}`}
                    className="text-body-sm font-medium text-primary hover:underline"
                  >
                    #{report.reported_user_id}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
              Quick Actions
            </h3>
            
            {report.report_status === 'pending' && (
              <button
                onClick={() => setReviewModal(true)}
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary-dark transition"
              >
                Review Report
              </button>
            )}
            
            {report.report_status !== 'pending' && (
              <div className="rounded-lg bg-gray-2 dark:bg-dark-2 p-4 text-center">
                <p className="text-body-sm text-dark-4 dark:text-dark-6">
                  This report has been {report.report_status}
                </p>
                {report.reviewed_by_name && (
                  <p className="mt-2 text-xs text-dark-4 dark:text-dark-6">
                    Reviewed by: {report.reviewed_by_name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-heading-5 font-bold text-dark dark:text-white">Review Report</h3>
              <button
                onClick={() => setReviewModal(false)}
                className="text-gray-4 hover:text-dark dark:text-gray-5 dark:hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleReview} className="space-y-4">
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                  Action Taken *
                </label>
                <select
                  value={reviewData.action_taken}
                  onChange={(e) => setReviewData({ ...reviewData, action_taken: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                  required
                >
                  <option value="">Select Action</option>
                  <option value="warning_sent">Warning Sent</option>
                  <option value="profile_suspended">Profile Suspended</option>
                  <option value="profile_blocked">Profile Blocked</option>
                  <option value="profile_deleted">Profile Deleted</option>
                  <option value="no_action">No Action</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                  Admin Notes *
                </label>
                <textarea
                  value={reviewData.admin_notes}
                  onChange={(e) => setReviewData({ ...reviewData, admin_notes: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                  placeholder="Enter admin notes..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setReviewModal(false)}
                  className="flex-1 rounded-lg border border-stroke px-4 py-3 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewing}
                  className="flex-1 rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reviewing ? 'Reviewing...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}

