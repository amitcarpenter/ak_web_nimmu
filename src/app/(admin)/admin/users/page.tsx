'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { userService, User } from '@/services/api/user.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

type TabType = 'all' | 'pending_approval' | 'approved' | 'rejected' | 'suspended' | 'blocked';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [rejectModal, setRejectModal] = useState<{ open: boolean; userId: number | null; reason: string }>({
    open: false,
    userId: null,
    reason: '',
  });
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

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers();
      
      if (response.success && response.data) {
        setAllUsers(response.data);
        applyFilters(response.data);
      } else {
        setError(response.message || 'Failed to fetch users');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters based on active tab and search
  const applyFilters = (usersToFilter: User[] = allUsers) => {
    let filteredUsers = usersToFilter;
    
    // Filter by status tab
    if (activeTab !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.account_status === activeTab);
    }
    
    // Client-side search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        (user.full_name?.toLowerCase().includes(query)) ||
        user.email.toLowerCase().includes(query) ||
        user.mobile_number?.includes(query)
      );
    }
    
    setUsers(filteredUsers);
  };

  // Update users when tab or search changes
  useEffect(() => {
    applyFilters();
  }, [activeTab, searchQuery]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Get tab counts
  const getTabCounts = () => {
    return {
      all: allUsers.length,
      pending_approval: allUsers.filter(u => u.account_status === 'pending_approval').length,
      approved: allUsers.filter(u => u.account_status === 'approved' || u.account_status === 'active').length,
      rejected: allUsers.filter(u => u.account_status === 'rejected').length,
      suspended: allUsers.filter(u => u.account_status === 'suspended').length,
      blocked: allUsers.filter(u => u.account_status === 'blocked').length,
    };
  };

  const tabCounts = getTabCounts();

  // Handle approve
  const handleApprove = (userId: number) => {
    setConfirmationModal({
      open: true,
      title: 'Approve User',
      message: 'Are you sure you want to approve this user?',
      type: 'info',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(userId);
          const response = await userService.approveUser(userId);
          
          if (response.success) {
            setToast({
              open: true,
              message: `User approved successfully! ${response.data?.message || ''}`,
              type: 'success',
            });
            fetchUsers(); // Refresh list
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
          setActionLoading(null);
        }
      },
    });
  };

  // Handle reject
  const handleReject = async () => {
    if (!rejectModal.userId) return;
    if (!rejectModal.reason.trim()) {
      setToast({
        open: true,
        message: 'Please provide a rejection reason',
        type: 'error',
      });
      return;
    }

    try {
      setActionLoading(rejectModal.userId);
      const response = await userService.rejectUser(rejectModal.userId, rejectModal.reason);
      
      if (response.success) {
        setToast({
          open: true,
          message: 'User rejected successfully',
          type: 'success',
        });
        setRejectModal({ open: false, userId: null, reason: '' });
        fetchUsers(); // Refresh list
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
      setActionLoading(null);
    }
  };

  // Handle suspend
  const handleSuspend = (userId: number) => {
    setConfirmationModal({
      open: true,
      title: 'Suspend User',
      message: 'Are you sure you want to suspend this user?',
      type: 'warning',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(userId);
          const response = await userService.suspendUser(userId);
          
          if (response.success) {
            setToast({
              open: true,
              message: 'User suspended successfully',
              type: 'success',
            });
            fetchUsers(); // Refresh list
          } else {
            setToast({
              open: true,
              message: response.message || 'Failed to suspend user',
              type: 'error',
            });
          }
        } catch (err: any) {
          setToast({
            open: true,
            message: err.message || 'An error occurred while suspending user',
            type: 'error',
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // Handle block
  const handleBlock = (userId: number) => {
    setConfirmationModal({
      open: true,
      title: 'Block User',
      message: 'Are you sure you want to block this user?',
      type: 'danger',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(userId);
          const response = await userService.blockUser(userId);
          
          if (response.success) {
            setToast({
              open: true,
              message: 'User blocked successfully',
              type: 'success',
            });
            fetchUsers(); // Refresh list
          } else {
            setToast({
              open: true,
              message: response.message || 'Failed to block user',
              type: 'error',
            });
          }
        } catch (err: any) {
          if (err.status === 404) {
            setToast({
              open: true,
              message: 'User not found',
              type: 'error',
            });
          } else {
            setToast({
              open: true,
              message: err.message || 'An error occurred while blocking user',
              type: 'error',
            });
          }
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // Handle unblock
  const handleUnblock = (userId: number) => {
    setConfirmationModal({
      open: true,
      title: 'Unblock User',
      message: 'Are you sure you want to unblock this user?',
      type: 'info',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(userId);
          const response = await userService.unblockUser(userId);
          
          if (response.success) {
            setToast({
              open: true,
              message: 'User unblocked successfully',
              type: 'success',
            });
            fetchUsers(); // Refresh list
          } else {
            setToast({
              open: true,
              message: response.message || 'Failed to unblock user',
              type: 'error',
            });
          }
        } catch (err: any) {
          if (err.status === 404) {
            setToast({
              open: true,
              message: 'User not found',
              type: 'error',
            });
          } else {
            setToast({
              open: true,
              message: err.message || 'An error occurred while unblocking user',
              type: 'error',
            });
          }
        } finally {
          setActionLoading(null);
        }
      },
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

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'all' as TabType, label: 'All Users', count: tabCounts.all },
    { id: 'pending_approval' as TabType, label: 'Pending Approval', count: tabCounts.pending_approval },
    { id: 'approved' as TabType, label: 'Approved', count: tabCounts.approved },
    { id: 'rejected' as TabType, label: 'Rejected', count: tabCounts.rejected },
    { id: 'suspended' as TabType, label: 'Suspended', count: tabCounts.suspended },
    { id: 'blocked' as TabType, label: 'Blocked', count: tabCounts.blocked },
  ];

  return (
    <>
      <Breadcrumb pageName="👥 User Management" />

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
          {/* Search */}
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-3 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhol-500 border-r-transparent"></div>
                <p className="mt-4 text-dark-5">Loading users...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 mb-4">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Users Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-dark dark:text-white">
                      Created
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-dark dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr className="border-b border-stroke dark:border-dark-3">
                      <td colSpan={7} className="px-4 py-8 text-center text-body-sm text-dark-4 dark:text-dark-6">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.user_id} className="border-b border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2">
                        <td className="px-4 py-3">
                          <div className="font-medium text-dark dark:text-white">
                            {user.full_name || 'N/A'}
                          </div>
                          {user.gender && (
                            <div className="text-xs text-dark-4 dark:text-dark-6 capitalize">
                              {user.gender}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-body-sm text-dark dark:text-white">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-body-sm text-dark dark:text-white">
                          {user.mobile_number || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(user.account_status)}
                        </td>
                        <td className="px-4 py-3 text-body-sm text-dark dark:text-white">
                          {user.city || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-body-sm text-dark-4 dark:text-dark-6">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {user.account_status === 'pending_approval' && (
                              <>
                                <button
                                  onClick={() => handleApprove(user.user_id)}
                                  disabled={actionLoading === user.user_id}
                                  className="rounded-lg bg-green px-3 py-1.5 text-xs font-medium text-white hover:bg-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === user.user_id ? '...' : 'Approve'}
                                </button>
                                <button
                                  onClick={() => setRejectModal({ open: true, userId: user.user_id, reason: '' })}
                                  disabled={actionLoading === user.user_id}
                                  className="rounded-lg bg-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {(user.account_status === 'approved' || user.account_status === 'active') && (
                              <>
                                <button
                                  onClick={() => handleSuspend(user.user_id)}
                                  disabled={actionLoading === user.user_id}
                                  className="rounded-lg bg-orange px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === user.user_id ? '...' : 'Suspend'}
                                </button>
                                <button
                                  onClick={() => handleBlock(user.user_id)}
                                  disabled={actionLoading === user.user_id}
                                  className="rounded-lg bg-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === user.user_id ? '...' : 'Block'}
                                </button>
                              </>
                            )}
                            {user.account_status === 'blocked' && (
                              <button
                                onClick={() => handleUnblock(user.user_id)}
                                disabled={actionLoading === user.user_id}
                                className="rounded-lg bg-green px-3 py-1.5 text-xs font-medium text-white hover:bg-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === user.user_id ? '...' : 'Unblock'}
                              </button>
                            )}
                            {user.account_status === 'suspended' && (
                              <button
                                onClick={() => handleUnblock(user.user_id)}
                                disabled={actionLoading === user.user_id}
                                className="rounded-lg bg-green px-3 py-1.5 text-xs font-medium text-white hover:bg-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionLoading === user.user_id ? '...' : 'Activate'}
                              </button>
                            )}
                            <button
                              onClick={() => router.push(`/admin/users/${user.user_id}`)}
                              className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition"
                            >
                              View
                            </button>
                          </div>
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

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            <h3 className="mb-4 text-heading-6 font-bold text-dark dark:text-white">
              Reject User
            </h3>
            <p className="mb-4 text-body-sm text-dark-4 dark:text-dark-6">
              Please provide a reason for rejecting this user:
            </p>
            <textarea
              value={rejectModal.reason}
              onChange={(e) => setRejectModal({ ...rejectModal, reason: e.target.value })}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark mb-4"
              required
            />
            <div className="flex gap-3">
              <button
                onClick={() => setRejectModal({ open: false, userId: null, reason: '' })}
                className="flex-1 rounded-lg border border-stroke px-4 py-2 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading === rejectModal.userId || !rejectModal.reason.trim()}
                className="flex-1 rounded-lg bg-red px-4 py-2 font-medium text-white hover:bg-red-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading === rejectModal.userId ? 'Rejecting...' : 'Reject User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
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
