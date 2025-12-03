'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { subscriptionUsersService, SubscriptionDetails } from '@/services/api/subscription-users.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

export default function SubscriptionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const subscriptionId = params?.id ? parseInt(params.id as string) : null;
  
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    if (!subscriptionId) {
      setError('Invalid subscription ID');
      setLoading(false);
      return;
    }

    fetchSubscriptionDetails();
  }, [subscriptionId]);

  const fetchSubscriptionDetails = async () => {
    if (!subscriptionId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await subscriptionUsersService.getSubscriptionDetails(subscriptionId);
      
      if (response.success && response.data) {
        setSubscription(response.data);
      } else {
        setError(response.message || 'Failed to fetch subscription details');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!subscriptionId) return;
    
    setActionLoading(true);
    try {
      const response = await subscriptionUsersService.cancelSubscription(subscriptionId);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'Subscription cancelled successfully',
          type: 'success',
        });
        setShowCancelModal(false);
        setTimeout(() => {
          fetchSubscriptionDetails();
        }, 1000);
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
      setActionLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!subscriptionId) return;
    
    setActionLoading(true);
    try {
      const response = await subscriptionUsersService.activateSubscription(subscriptionId);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'Subscription activated successfully',
          type: 'success',
        });
        setShowActivateModal(false);
        setTimeout(() => {
          fetchSubscriptionDetails();
        }, 1000);
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
      setActionLoading(false);
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

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb pageName="Subscription Details" />
          <Link
            href="/admin/subscriptions"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            ← Back to Subscriptions
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading subscription details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !subscription) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb pageName="Subscription Details" />
          <Link
            href="/admin/subscriptions"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            ← Back to Subscriptions
          </Link>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error || 'Subscription not found'}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="💳 Subscription Details" />
        <Link
          href="/admin/subscriptions"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← Back to Subscriptions
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subscription Information */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
              <div className="flex items-center justify-between">
                <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                  Subscription Information
                </h3>
                {getStatusBadge(subscription.status)}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Subscription ID
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    #{subscription.subscription_id}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Plan Name
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.plan_name}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Plan Description
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.plan_description}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Duration
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.duration_days} days
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Start Date
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {formatDate(subscription.start_date)}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    End Date
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {formatDate(subscription.end_date)}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Amount Paid
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.currency} {subscription.amount_paid}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Auto Renew
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.auto_renew === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
                {subscription.promo_code && (
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Promo Code
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      {subscription.promo_code}
                    </p>
                  </div>
                )}
                {subscription.discount_amount && parseFloat(subscription.discount_amount) > 0 && (
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Discount Amount
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      {subscription.currency} {subscription.discount_amount}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
              <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                User Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    User ID
                  </label>
                  <Link
                    href={`/admin/users/${subscription.user_id}`}
                    className="text-body-sm font-medium text-primary hover:underline"
                  >
                    #{subscription.user_id}
                  </Link>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Full Name
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.full_name || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Email
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.email}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Mobile Number
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.mobile_number}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Account Status
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                    {subscription.account_status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {subscription.payment_id && (
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                  Payment Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Payment ID
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      #{subscription.payment_id}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Payment Gateway
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                      {subscription.payment_gateway || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Gateway Transaction ID
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      {subscription.gateway_transaction_id || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Payment Status
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                      {subscription.payment_status || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Transaction Amount
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      {subscription.currency} {subscription.amount || subscription.transaction_amount || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                      Payment Completed At
                    </label>
                    <p className="text-body-sm font-medium text-dark dark:text-white">
                      {formatDate(subscription.completed_at || subscription.payment_completed_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plan Features */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
              <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                Plan Features
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Max Matches Per Week
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.max_matches_per_week}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Profile Boost Count
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.profile_boost_count}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Can View Contact
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.can_view_contact === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Unlimited Messages
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.can_send_unlimited_messages === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Can See Who Viewed
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.can_see_who_viewed === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Can See Who Accepted
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.can_see_who_accepted === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Premium Badge
                  </label>
                  <p className="text-body-sm font-medium text-dark dark:text-white">
                    {subscription.premium_badge === 1 ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
              <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                Quick Actions
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {subscription.status === 'active' && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-dark transition"
                >
                  Cancel Subscription
                </button>
              )}
              {subscription.status === 'pending_approval' && (
                <button
                  onClick={() => setShowActivateModal(true)}
                  className="w-full rounded-lg bg-green px-4 py-2 text-sm font-medium text-white hover:bg-green-dark transition"
                >
                  Activate Subscription
                </button>
              )}
            </div>
          </div>

          {/* Subscription Details */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
              <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                Additional Details
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Created At
                </label>
                <p className="text-body-sm font-medium text-dark dark:text-white">
                  {formatDate(subscription.created_at)}
                </p>
              </div>
              <div>
                <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Last Updated
                </label>
                <p className="text-body-sm font-medium text-dark dark:text-white">
                  {formatDate(subscription.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmationModal
        open={showCancelModal}
        title="Cancel Subscription"
        message={`Are you sure you want to cancel subscription #${subscription.subscription_id}? This action cannot be undone.`}
        type="danger"
        confirmText="Cancel Subscription"
        cancelText="Keep Active"
        onConfirm={handleCancel}
        onCancel={() => setShowCancelModal(false)}
        loading={actionLoading}
      />

      {/* Activate Modal */}
      <ConfirmationModal
        open={showActivateModal}
        title="Activate Subscription"
        message={`Are you sure you want to activate subscription #${subscription.subscription_id}?`}
        type="info"
        confirmText="Activate"
        cancelText="Cancel"
        onConfirm={handleActivate}
        onCancel={() => setShowActivateModal(false)}
        loading={actionLoading}
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


