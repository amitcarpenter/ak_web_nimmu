'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { reportService, Report } from '@/services/api/report.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

type TabType = 'all' | 'pending' | 'resolved' | 'dismissed';

export default function ReportsManagement() {
  const router = useRouter();
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    type: 'info',
  });

  // Fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportService.getReports();
      
      if (response.success && response.data) {
        setAllReports(response.data);
        applyFilters(response.data);
      } else {
        setError(response.message || 'Failed to fetch reports');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching reports');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters based on active tab
  const applyFilters = (reportsToFilter: Report[] = allReports) => {
    let filteredReports = reportsToFilter;
    
    // Filter by status tab
    if (activeTab !== 'all') {
      filteredReports = filteredReports.filter(report => report.report_status === activeTab);
    }
    
    setReports(filteredReports);
  };

  // Update reports when tab or allReports changes
  useEffect(() => {
    if (allReports.length > 0) {
      applyFilters(allReports);
    }
  }, [activeTab, allReports]);

  // Fetch reports on mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'pending': { label: '🔴 Pending', className: 'bg-yellow-light-4 text-yellow-dark' },
      'resolved': { label: '✅ Resolved', className: 'bg-green-light-7 text-green' },
      'dismissed': { label: '❌ Dismissed', className: 'bg-gray-2 text-dark-4' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-2 text-dark-4' };
    
    return (
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Format report type
  const formatReportType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get tab counts
  const getTabCounts = () => {
    return {
      all: allReports.length,
      pending: allReports.filter(r => r.report_status === 'pending').length,
      resolved: allReports.filter(r => r.report_status === 'resolved').length,
      dismissed: allReports.filter(r => r.report_status === 'dismissed').length,
    };
  };

  const tabCounts = getTabCounts();

  const tabs = [
    { id: 'all' as TabType, label: 'All Reports', count: tabCounts.all },
    { id: 'pending' as TabType, label: 'Pending', count: tabCounts.pending },
    { id: 'resolved' as TabType, label: 'Resolved', count: tabCounts.resolved },
    { id: 'dismissed' as TabType, label: 'Dismissed', count: tabCounts.dismissed },
  ];

  return (
    <>
      <Breadcrumb pageName="🚨 Reports Management" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Tabs */}
        <div className="border-b border-stroke dark:border-dark-3">
          <div className="flex flex-wrap gap-2 p-4 sm:p-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-2 text-dark-4 hover:bg-gray-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-dark-4/20'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhol-500 border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading reports...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 mb-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => fetchReports(statusFilter === 'all' ? undefined : statusFilter)}
            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

        <div className="p-4 sm:p-7.5">
          {/* Reports Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Report ID
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Reporter
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Reported User
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Type
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Date
                  </th>
                  <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-body-sm text-dark-4 dark:text-dark-6">
                      No reports found.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.report_id} className="border-b border-stroke dark:border-strokedark hover:bg-gray-2 dark:hover:bg-dark-2">
                      <td className="px-4 py-4 font-medium text-primary">
                        #{report.report_id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-body-sm text-dark dark:text-white">
                          {report.reporter_name || 'N/A'}
                        </div>
                        {report.reporter_email && (
                          <div className="text-xs text-dark-4 dark:text-dark-6">
                            {report.reporter_email}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-body-sm text-dark dark:text-white">
                          {report.reported_name || report.reported_email || 'N/A'}
                        </div>
                        {report.reported_email && (
                          <div className="text-xs text-dark-4 dark:text-dark-6">
                            {report.reported_email}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-body-sm text-dark dark:text-white">
                        {formatReportType(report.report_type)}
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(report.report_status)}
                      </td>
                      <td className="px-4 py-4 text-body-sm text-dark-4 dark:text-dark-6">
                        {formatDate(report.reported_at)}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/admin/reports/${report.report_id}`}
                          className="text-body-sm font-medium text-primary hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>

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
