'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { subscriptionUsersService, SubscriptionUser, SubscriptionStatistics } from '@/services/api/subscription-users.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

type TabType = 'all' | 'active' | 'pending' | 'cancelled' | 'expired';

export default function SubscriptionsPage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SubscriptionUser[]>([]);
  const [allSubscriptions, setAllSubscriptions] = useState<SubscriptionUser[]>([]);
  const [statistics, setStatistics] = useState<SubscriptionStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {},
  });
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    type: 'info',
  });

  // Fetch all subscriptions and statistics
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [subscriptionsResponse, statisticsResponse] = await Promise.all([
        subscriptionUsersService.getSubscriptions(),
        subscriptionUsersService.getStatistics(),
      ]);
      
      if (subscriptionsResponse.success && subscriptionsResponse.data) {
        const subs = subscriptionsResponse.data.subscriptions || subscriptionsResponse.data;
        setAllSubscriptions(Array.isArray(subs) ? subs : []);
        applyFilters(Array.isArray(subs) ? subs : []);
      } else {
        setError(subscriptionsResponse.message || 'Failed to fetch subscriptions');
      }

      if (statisticsResponse.success && statisticsResponse.data) {
        setStatistics(statisticsResponse.data);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters based on active tab and search
  const applyFilters = (subsToFilter: SubscriptionUser[] = allSubscriptions) => {
    let filteredSubs = subsToFilter;
    
    // Filter by status tab
    if (activeTab !== 'all') {
      filteredSubs = filteredSubs.filter(sub => {
        if (activeTab === 'expired') {
          // Check if subscription is expired
          if (!sub.end_date) return false;
          return new Date(sub.end_date) < new Date() && sub.status === 'active';
        }
        return sub.status === activeTab;
      });
    }
    
    // Client-side search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredSubs = filteredSubs.filter(sub => 
        (sub.full_name?.toLowerCase().includes(query)) ||
        sub.email.toLowerCase().includes(query) ||
        sub.mobile_number?.includes(query) ||
        sub.plan_name?.toLowerCase().includes(query)
      );
    }
    
    setSubscriptions(filteredSubs);
  };

  // Update subscriptions when tab or search changes
  useEffect(() => {
    applyFilters();
  }, [activeTab, searchQuery]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Get tab counts
  const getTabCounts = () => {
    const now = new Date();
    return {
      all: allSubscriptions.length,
      active: allSubscriptions.filter(s => s.status === 'active').length,
      pending: allSubscriptions.filter(s => s.status === 'pending_approval').length,
      cancelled: allSubscriptions.filter(s => s.status === 'cancelled').length,
      expired: allSubscriptions.filter(s => {
        if (!s.end_date || s.status !== 'active') return false;
        return new Date(s.end_date) < now;
      }).length,
    };
  };

  const tabCounts = getTabCounts();

  // Handle cancel subscription
  const handleCancel = async (subscriptionId: number) => {
    setActionLoading(subscriptionId);
    try {
      const response = await subscriptionUsersService.cancelSubscription(subscriptionId);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'Subscription cancelled successfully',
          type: 'success',
        });
        fetchData();
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to cancel subscription',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while cancelling subscription',
        type: 'error',
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Handle activate subscription
  const handleActivate = async (subscriptionId: number) => {
    setActionLoading(subscriptionId);
    try {
      const response = await subscriptionUsersService.activateSubscription(subscriptionId);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'Subscription activated successfully',
          type: 'success',
        });
        fetchData();
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to activate subscription',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while activating subscription',
        type: 'error',
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'active': { label: 'Active', className: 'bg-green-light-7 text-green' },
      'pending_approval': { label: 'Pending', className: 'bg-yellow-light-4 text-yellow-dark' },
      'cancelled': { label: 'Cancelled', className: 'bg-red-light-5 text-red' },
      'expired': { label: 'Expired', className: 'bg-gray-2 text-dark-4' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-2 text-dark-4' };
    
    return (
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const tabs = [
    { id: 'all' as TabType, label: 'All Subscriptions', count: tabCounts.all },
    { id: 'active' as TabType, label: 'Active', count: tabCounts.active },
    { id: 'pending' as TabType, label: 'Pending', count: tabCounts.pending },
    { id: 'cancelled' as TabType, label: 'Cancelled', count: tabCounts.cancelled },
    { id: 'expired' as TabType, label: 'Expired', count: tabCounts.expired },
  ];

  return (
    <>
      <Breadcrumb pageName="💳 Subscription Users" />

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm text-dark-4 dark:text-dark-6">Total Subscriptions</p>
                <h3 className="mt-2 text-heading-4 font-bold text-dark dark:text-white">
                  {statistics.total_subscriptions}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm text-dark-4 dark:text-dark-6">Active Subscriptions</p>
                <h3 className="mt-2 text-heading-4 font-bold text-green">
                  {statistics.active_subscriptions}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-light-7/20 dark:bg-green-900/20">
                <svg className="h-6 w-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm text-dark-4 dark:text-dark-6">Total Revenue</p>
                <h3 className="mt-2 text-heading-4 font-bold text-dark dark:text-white">
                  ₹{parseFloat(statistics.total_revenue).toLocaleString('en-IN')}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-light-7/20 dark:bg-green-900/20">
                <svg className="h-6 w-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-sm text-dark-4 dark:text-dark-6">Pending Approvals</p>
                <h3 className="mt-2 text-heading-4 font-bold text-yellow-dark">
                  {statistics.pending_subscriptions}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-light-4/20 dark:bg-yellow-900/20">
                <svg className="h-6 w-6 text-yellow-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

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

        <div className="p-4 sm:p-7.5">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, email, mobile, or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-white px-5 py-3 text-body-sm outline-none focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus-visible:border-primary"
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-dark-5">Loading subscriptions...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Subscriptions Table */}
          {!loading && !error && (
            <>
              {subscriptions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-stroke dark:border-dark-3">
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Subscription ID
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Plan
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Start Date
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          End Date
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-body-sm font-medium text-dark dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((subscription) => (
                        <tr
                          key={subscription.subscription_id}
                          className="border-b border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2 transition"
                        >
                          <td className="px-4 py-4 text-body-sm text-dark dark:text-white">
                            #{subscription.subscription_id}
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="text-body-sm font-medium text-dark dark:text-white">
                                {subscription.full_name || subscription.email}
                              </p>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                {subscription.email}
                              </p>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                {subscription.mobile_number}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="text-body-sm font-medium text-dark dark:text-white">
                                {subscription.plan_name}
                              </p>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                {subscription.duration_days} days
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-body-sm text-dark dark:text-white">
                            {subscription.currency} {subscription.amount_paid}
                          </td>
                          <td className="px-4 py-4 text-body-sm text-dark dark:text-white">
                            {formatDate(subscription.start_date)}
                          </td>
                          <td className="px-4 py-4 text-body-sm text-dark dark:text-white">
                            {formatDate(subscription.end_date)}
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(subscription.status)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/admin/subscriptions/${subscription.subscription_id}`}
                                className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2 transition"
                              >
                                View
                              </Link>
                              {subscription.status === 'active' && (
                                <button
                                  onClick={() => {
                                    setConfirmationModal({
                                      open: true,
                                      title: 'Cancel Subscription',
                                      message: `Are you sure you want to cancel subscription #${subscription.subscription_id}?`,
                                      type: 'danger',
                                      onConfirm: () => {
                                        handleCancel(subscription.subscription_id);
                                        setConfirmationModal({ ...confirmationModal, open: false });
                                      },
                                    });
                                  }}
                                  disabled={actionLoading === subscription.subscription_id}
                                  className="rounded-lg bg-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === subscription.subscription_id ? 'Processing...' : 'Cancel'}
                                </button>
                              )}
                              {subscription.status === 'pending_approval' && (
                                <button
                                  onClick={() => {
                                    setConfirmationModal({
                                      open: true,
                                      title: 'Activate Subscription',
                                      message: `Are you sure you want to activate subscription #${subscription.subscription_id}?`,
                                      type: 'info',
                                      onConfirm: () => {
                                        handleActivate(subscription.subscription_id);
                                        setConfirmationModal({ ...confirmationModal, open: false });
                                      },
                                    });
                                  }}
                                  disabled={actionLoading === subscription.subscription_id}
                                  className="rounded-lg bg-green px-3 py-1.5 text-xs font-medium text-white hover:bg-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === subscription.subscription_id ? 'Processing...' : 'Activate'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No subscriptions found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={confirmationModal.onConfirm}
        onCancel={() => setConfirmationModal({ ...confirmationModal, open: false })}
        loading={actionLoading !== null}
      />

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


