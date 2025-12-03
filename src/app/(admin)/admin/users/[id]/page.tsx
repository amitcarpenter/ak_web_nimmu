'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { userService, User } from '@/services/api/user.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

type TabType = 'overview' | 'profile' | 'photos' | 'documents' | 'kundli' | 'preferences' | 'subscriptions';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id ? parseInt(params.id as string) : null;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    if (!userId) {
      setError('Invalid user ID');
      setLoading(false);
      return;
    }

    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await userService.getUsers();
      
      if (response.success && response.data) {
        const foundUser = response.data.find(u => u.user_id === userId);
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found');
        }
      } else {
        setError(response.message || 'Failed to fetch user details');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!userId) return;
    
    setActionLoading(true);
    try {
      const response = await userService.approveUser(userId);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'User approved successfully',
          type: 'success',
        });
        setShowApproveModal(false);
        setTimeout(() => {
          fetchUserDetails();
        }, 1000);
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to approve user',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while approving user',
        type: 'error',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!userId || !rejectionReason.trim()) {
      setToast({
        open: true,
        message: 'Please provide a rejection reason',
        type: 'error',
      });
      return;
    }
    
    setActionLoading(true);
    try {
      const response = await userService.rejectUser(userId, rejectionReason);
      if (response.success) {
        setToast({
          open: true,
          message: response.message || 'User rejected successfully',
          type: 'success',
        });
        setShowRejectModal(false);
        setRejectionReason('');
        setTimeout(() => {
          fetchUserDetails();
        }, 1000);
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to reject user',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while rejecting user',
        type: 'error',
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
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
      'pending_approval': { label: 'Pending Approval', className: 'bg-yellow-light-4 text-yellow-dark' },
      'approved': { label: 'Approved', className: 'bg-green-light-7 text-green' },
      'active': { label: 'Active', className: 'bg-green-light-7 text-green' },
      'rejected': { label: 'Rejected', className: 'bg-red-light-5 text-red' },
      'suspended': { label: 'Suspended', className: 'bg-orange-light-5 text-orange' },
      'blocked': { label: 'Blocked', className: 'bg-red-light-5 text-red' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-2 text-dark-4' };
    
    return (
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Get primary photo
  const getPrimaryPhoto = () => {
    if (!user?.photos || user.photos.length === 0) return null;
    const primary = user.photos.find(p => p.is_primary === 1);
    return primary || user.photos[0];
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb pageName="User Details" />
          <Link
            href="/admin/users"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            ← Back to Users
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading user details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb pageName="User Details" />
          <Link
            href="/admin/users"
            className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
          >
            ← Back to Users
          </Link>
        </div>
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-600 dark:text-red-400">{error || 'User not found'}</p>
        </div>
      </>
    );
  }

  const primaryPhoto = getPrimaryPhoto();

  // Tabs configuration
  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'Profile' },
    { id: 'photos', label: 'Photos', count: user.photos?.length || 0 },
    { id: 'documents', label: 'Documents', count: user.documents?.length || 0 },
    { id: 'kundli', label: 'Kundli', count: user.kundli ? 1 : 0 },
    { id: 'preferences', label: 'Preferences' },
    { id: 'subscriptions', label: 'Subscriptions', count: user.subscriptions?.length || 0 },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb pageName="👤 User Details" />
        <Link
          href="/admin/users"
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-dark font-medium hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 transition"
        >
          ← Back to Users
        </Link>
      </div>

      {/* User Header Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card mb-6">
        <div className="p-6">
          <div className="flex items-start gap-6">
            {primaryPhoto ? (
              <div className="relative h-24 w-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary">
                <Image
                  src={primaryPhoto.photo_url}
                  alt={user.full_name || 'User'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-2 dark:bg-dark-2 flex items-center justify-center border-2 border-primary">
                <span className="text-2xl text-dark-4 dark:text-dark-6">
                  {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-heading-4 font-bold text-dark dark:text-white">
                  {user.full_name || user.email}
                </h2>
                {getStatusBadge(user.account_status)}
              </div>
              <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-1">
                {user.email} • {user.mobile_number}
              </p>
              {user.city && (
                <p className="text-body-sm text-dark-4 dark:text-dark-6">
                  📍 {user.city}
                </p>
              )}
            </div>
            {user.account_status === 'pending_approval' && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="rounded-lg bg-green px-4 py-2 text-sm font-medium text-white hover:bg-green-dark transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-dark transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Container */}
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
                {tab.count !== undefined && tab.count > 0 && (
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

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Basic Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Full Name
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.full_name || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Email Address
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.email}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Mobile Number
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.mobile_number || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Gender
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                          {user.gender || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Age
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.age || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          City
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.city || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Account Status
                        </label>
                        <div className="mt-1">
                          {getStatusBadge(user.account_status)}
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Subscription Status
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.subscription_status || 'No Subscription'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rejection Reason (if rejected) */}
                {user.account_status === 'rejected' && user.rejection_reason && (
                  <div className="rounded-[10px] border border-red-200 bg-red-50 shadow-1 dark:border-red-800 dark:bg-red-900/20 dark:shadow-card">
                    <div className="border-b border-red-200 px-6 py-4 dark:border-red-800">
                      <h3 className="text-heading-6 font-bold text-red">
                        Rejection Reason
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-body-sm text-red-600 dark:text-red-400">
                        {user.rejection_reason}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Details */}
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Account Details
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        User ID
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        #{user.user_id}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Account Created
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Last Login
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {formatDate(user.last_login)}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Login Count
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.login_count}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Failed Login Attempts
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.failed_login_attempts}
                      </p>
                    </div>
                    {user.account_locked_until && (
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Account Locked Until
                        </label>
                        <p className="text-body-sm font-medium text-red">
                          {formatDate(user.account_locked_until)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Completion Status */}
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Profile Completion
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-dark dark:text-white">Profile Completed</span>
                      <span className={`text-body-sm font-medium ${user.profile_completed ? 'text-green' : 'text-red'}`}>
                        {user.profile_completed ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-dark dark:text-white">Preferences Completed</span>
                      <span className={`text-body-sm font-medium ${user.preferences_completed ? 'text-green' : 'text-red'}`}>
                        {user.preferences_completed ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-dark dark:text-white">Birth Details Completed</span>
                      <span className={`text-body-sm font-medium ${user.birth_details_completed ? 'text-green' : 'text-red'}`}>
                        {user.birth_details_completed ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-dark dark:text-white">Matches Activated</span>
                      <span className={`text-body-sm font-medium ${user.matches_activated ? 'text-green' : 'text-red'}`}>
                        {user.matches_activated ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {user.photo_count !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm text-dark dark:text-white">Photos Uploaded</span>
                        <span className="text-body-sm font-medium text-dark dark:text-white">
                          {user.photo_count}
                        </span>
                      </div>
                    )}
                    {user.document_count !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm text-dark dark:text-white">Documents Submitted</span>
                        <span className="text-body-sm font-medium text-dark dark:text-white">
                          {user.document_count}
                        </span>
                      </div>
                    )}
                    {user.kundli_count !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm text-dark dark:text-white">Kundli Data Filled</span>
                        <span className={`text-body-sm font-medium ${user.kundli_count > 0 ? 'text-green' : 'text-red'}`}>
                          {user.kundli_count > 0 ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Additional Information
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Biometric Enabled
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.biometric_enabled ? 'Yes' : 'No'}
                        {user.biometric_type && ` (${user.biometric_type})`}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Password Changed
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.is_password_changed ? 'Yes' : 'No'}
                      </p>
                    </div>
                    {user.approved_by && (
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Approved By
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          Admin #{user.approved_by}
                        </p>
                        {user.approved_at && (
                          <p className="text-xs text-dark-4 dark:text-dark-6 mt-1">
                            {formatDate(user.approved_at)}
                          </p>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Last Updated
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {formatDate(user.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && user.profile && (
            <div className="space-y-6">
              {/* Profile Information */}
              <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                  <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                    Profile Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Full Name
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.full_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Date of Birth
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.date_of_birth ? formatDate(user.profile.date_of_birth) : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Gender
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.gender || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Marital Status
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.marital_status?.replace('_', ' ') || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Height
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.height_cm ? `${user.profile.height_cm} cm` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Weight
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.weight_kg ? `${user.profile.weight_kg} kg` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Body Type
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.body_type || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Complexion
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.complexion || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Address
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.address || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        City
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.city || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        State
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.state || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Country
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.country || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Pincode
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.pincode || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Highest Education
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.highest_education || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Education Details
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.education_details || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Profession
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.profession || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Occupation Details
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.occupation_details || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Annual Income
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.annual_income || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Religion
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.religion || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Caste
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.caste || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Sub Caste
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.sub_caste || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Gotra
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.gotra || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Mother Tongue
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.mother_tongue || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Diet
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.diet || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Smoking
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.smoking || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Drinking
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.drinking || 'N/A'}
                      </p>
                    </div>
                    {user.profile.about_me && (
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          About Me
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.profile.about_me}
                        </p>
                      </div>
                    )}
                    {user.profile.hobbies && (
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Hobbies
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.profile.hobbies}
                        </p>
                      </div>
                    )}
                    {user.profile.interests && (
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Interests
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.profile.interests}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                  <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                    Family Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Father's Name
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.father_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Father's Occupation
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.father_occupation || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Mother's Name
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.mother_name || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Mother's Occupation
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.mother_occupation || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Siblings
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white">
                        {user.profile.siblings !== undefined ? user.profile.siblings : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Family Type
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.family_type || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                        Family Values
                      </label>
                      <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                        {user.profile.family_values || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div>
              {user.photos && user.photos.length > 0 ? (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Photos ({user.photos.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {user.photos.map((photo) => (
                        <div key={photo.photo_id} className="relative aspect-square rounded-lg overflow-hidden border-2 border-stroke dark:border-dark-3">
                          {photo.is_primary === 1 && (
                            <div className="absolute top-2 left-2 z-10 rounded bg-primary px-2 py-1 text-xs font-medium text-white">
                              Primary
                            </div>
                          )}
                          <Image
                            src={photo.photo_url}
                            alt={`Photo ${photo.display_order}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No photos uploaded yet
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              {user.documents && user.documents.length > 0 ? (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Documents ({user.documents.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {user.documents.map((doc) => (
                        <div key={doc.document_id} className="rounded-lg border border-stroke dark:border-dark-3 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-body-sm font-medium text-dark dark:text-white capitalize">
                                  {doc.document_type}
                                </span>
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                  doc.verification_status === 'verified' 
                                    ? 'bg-green-light-7 text-green' 
                                    : doc.verification_status === 'rejected'
                                    ? 'bg-red-light-5 text-red'
                                    : 'bg-yellow-light-4 text-yellow-dark'
                                }`}>
                                  {doc.verification_status}
                                </span>
                              </div>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-1">
                                Document Number: {doc.document_number}
                              </p>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                Uploaded: {formatDate(doc.uploaded_at)}
                              </p>
                              {doc.rejection_reason && (
                                <p className="text-body-sm text-red mt-2">
                                  Rejection Reason: {doc.rejection_reason}
                                </p>
                              )}
                            </div>
                            <a
                              href={doc.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-stroke dark:border-dark-3 px-3 py-2 text-sm font-medium text-dark dark:text-white hover:bg-gray-2 dark:hover:bg-dark-2 transition"
                            >
                              View
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No documents submitted yet
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Kundli Tab */}
          {activeTab === 'kundli' && (
            <div>
              {user.kundli ? (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Kundli Information
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth Date
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_date ? formatDate(user.kundli.birth_date) : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth Time
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_time || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth Place
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_place || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth City
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_city || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth State
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_state || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Birth Country
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.birth_country || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Rashi
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.rashi || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Nakshatra
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.nakshatra || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Charan
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.charan || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Gana
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                          {user.kundli.gana || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Is Manglik
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.kundli.is_manglik === 1 ? 'Yes' : 'No'}
                        </p>
                      </div>
                      {user.kundli.manglik_details && (
                        <div>
                          <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                            Manglik Details
                          </label>
                          <p className="text-body-sm font-medium text-dark dark:text-white">
                            {user.kundli.manglik_details}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No kundli data available
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              {user.preferences ? (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Partner Preferences
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Age Range
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.min_age} - {user.preferences.max_age} years
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Height Range
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.min_height_cm} - {user.preferences.max_height_cm} cm
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Cities
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_cities || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred States
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_states || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Education
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_education || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Profession
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_profession || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Minimum Income
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.min_income || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Marital Status
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white capitalize">
                          {user.preferences.preferred_marital_status?.replace('_', ' ') || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Religion
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_religion || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Caste
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_caste || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Preferred Mother Tongue
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.preferred_mother_tongue || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                          Require Kundli Match
                        </label>
                        <p className="text-body-sm font-medium text-dark dark:text-white">
                          {user.preferences.require_kundli_match === 1 ? 'Yes' : 'No'}
                        </p>
                      </div>
                      {user.preferences.require_kundli_match === 1 && (
                        <div>
                          <label className="mb-2 block text-body-sm font-medium text-dark-4 dark:text-dark-6">
                            Minimum Kundli Score
                          </label>
                          <p className="text-body-sm font-medium text-dark dark:text-white">
                            {user.preferences.min_kundli_score || 'N/A'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No preferences set yet
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === 'subscriptions' && (
            <div>
              {user.subscriptions && user.subscriptions.length > 0 ? (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                  <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
                    <h3 className="text-heading-6 font-bold text-dark dark:text-white">
                      Subscriptions ({user.subscriptions.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {user.subscriptions.map((sub) => (
                        <div key={sub.subscription_id} className="rounded-lg border border-stroke dark:border-dark-3 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-body-sm font-bold text-dark dark:text-white">
                                  {sub.plan_name}
                                </span>
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                  sub.status === 'active' 
                                    ? 'bg-green-light-7 text-green' 
                                    : sub.status === 'cancelled'
                                    ? 'bg-red-light-5 text-red'
                                    : 'bg-yellow-light-4 text-yellow-dark'
                                }`}>
                                  {sub.status}
                                </span>
                              </div>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-1">
                                {sub.plan_description}
                              </p>
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                Amount: {sub.currency} {sub.amount_paid} • Duration: {sub.duration_days} days
                              </p>
                              {sub.promo_code && (
                                <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                  Promo Code: {sub.promo_code}
                                </p>
                              )}
                              <p className="text-body-sm text-dark-4 dark:text-dark-6">
                                Created: {formatDate(sub.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-12 text-center">
                  <p className="text-body-sm text-dark-4 dark:text-dark-6">
                    No subscriptions found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      <ConfirmationModal
        open={showApproveModal}
        title="Approve User"
        message={`Are you sure you want to approve ${user.full_name || user.email}? This will send login credentials to the user.`}
        type="info"
        confirmText="Approve"
        cancelText="Cancel"
        onConfirm={handleApprove}
        onCancel={() => setShowApproveModal(false)}
        loading={actionLoading}
      />

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <h3 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
              Reject User
            </h3>
            <p className="mb-4 text-body-sm text-dark-4 dark:text-dark-6">
              Please provide a reason for rejecting {user.full_name || user.email}:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="mb-4 w-full rounded-lg border border-stroke px-4 py-3 text-body-sm outline-none focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              rows={4}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                disabled={actionLoading}
                className="flex-1 rounded-lg border border-stroke px-4 py-2.5 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 rounded-lg bg-red px-4 py-2.5 font-medium text-white hover:bg-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Processing...' : 'Reject'}
              </button>
            </div>
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
