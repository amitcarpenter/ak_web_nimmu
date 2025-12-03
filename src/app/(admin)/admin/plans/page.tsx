'use client';

import { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { subscriptionService, SubscriptionPlan, CreatePlanData, UpdatePlanData } from '@/services/api/subscription.service';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<{ open: boolean; plan: SubscriptionPlan | null }>({ open: false, plan: null });
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
  
  const [formData, setFormData] = useState<CreatePlanData>({
    plan_name: '',
    plan_description: '',
    duration_days: 30,
    price: 0,
    max_matches_per_week: 10,
    can_view_contact: false,
    can_send_unlimited_messages: false,
    profile_boost_count: 0,
    can_see_who_viewed: false,
    can_see_who_accepted: false,
    premium_badge: false,
    display_order: 1,
  });

  // Fetch plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await subscriptionService.getPlans();
      
      if (response.success && response.data) {
        // Sort by display_order
        const sortedPlans = [...response.data].sort((a, b) => a.display_order - b.display_order);
        setPlans(sortedPlans);
      } else {
        setError(response.message || 'Failed to fetch plans');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle create plan
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.plan_name.trim()) {
      setToast({
        open: true,
        message: 'Plan name is required',
        type: 'error',
      });
      return;
    }

    try {
      setActionLoading(-1);
      const response = await subscriptionService.createPlan(formData);
      
      if (response.success) {
        setToast({
          open: true,
          message: 'Plan created successfully!',
          type: 'success',
        });
        setCreateModal(false);
        resetForm();
        fetchPlans();
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to create plan',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while creating plan',
        type: 'error',
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Handle update plan
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editModal.plan) return;

    try {
      setActionLoading(editModal.plan.plan_id);
      const updateData: UpdatePlanData = {
        plan_name: formData.plan_name,
        plan_description: formData.plan_description,
        duration_days: formData.duration_days,
        price: formData.price,
        max_matches_per_week: formData.max_matches_per_week,
        can_view_contact: formData.can_view_contact,
        can_send_unlimited_messages: formData.can_send_unlimited_messages,
        profile_boost_count: formData.profile_boost_count,
        can_see_who_viewed: formData.can_see_who_viewed,
        can_see_who_accepted: formData.can_see_who_accepted,
        premium_badge: formData.premium_badge,
        display_order: formData.display_order,
      };

      const response = await subscriptionService.updatePlan(editModal.plan.plan_id, updateData);
      
      if (response.success) {
        setToast({
          open: true,
          message: 'Plan updated successfully!',
          type: 'success',
        });
        setEditModal({ open: false, plan: null });
        resetForm();
        fetchPlans();
      } else {
        setToast({
          open: true,
          message: response.message || 'Failed to update plan',
          type: 'error',
        });
      }
    } catch (err: any) {
      setToast({
        open: true,
        message: err.message || 'An error occurred while updating plan',
        type: 'error',
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete plan
  const handleDelete = (planId: number) => {
    setConfirmationModal({
      open: true,
      title: 'Delete Plan',
      message: 'Are you sure you want to delete this plan? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(planId);
          const response = await subscriptionService.deletePlan(planId);
          
          if (response.success) {
            setToast({
              open: true,
              message: 'Plan deleted successfully!',
              type: 'success',
            });
            fetchPlans();
          } else {
            setToast({
              open: true,
              message: response.message || 'Failed to delete plan',
              type: 'error',
            });
          }
        } catch (err: any) {
          setToast({
            open: true,
            message: err.message || 'An error occurred while deleting plan',
            type: 'error',
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // Handle toggle active
  const handleToggleActive = (plan: SubscriptionPlan) => {
    const newStatus = plan.is_active === 1 ? false : true;
    const action = newStatus ? 'activate' : 'deactivate';
    
    setConfirmationModal({
      open: true,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Plan`,
      message: `Are you sure you want to ${action} this plan?`,
      type: newStatus ? 'info' : 'warning',
      onConfirm: async () => {
        setConfirmationModal({ ...confirmationModal, open: false });
        try {
          setActionLoading(plan.plan_id);
          const response = await subscriptionService.updatePlan(plan.plan_id, { is_active: newStatus });
          
          if (response.success) {
            setToast({
              open: true,
              message: `Plan ${action}d successfully!`,
              type: 'success',
            });
            fetchPlans();
          } else {
            setToast({
              open: true,
              message: response.message || `Failed to ${action} plan`,
              type: 'error',
            });
          }
        } catch (err: any) {
          setToast({
            open: true,
            message: err.message || `An error occurred while ${action}ing plan`,
            type: 'error',
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  // Open edit modal
  const openEditModal = (plan: SubscriptionPlan) => {
    setFormData({
      plan_name: plan.plan_name,
      plan_description: plan.plan_description,
      duration_days: plan.duration_days,
      price: parseFloat(plan.price),
      max_matches_per_week: plan.max_matches_per_week,
      can_view_contact: plan.can_view_contact === 1,
      can_send_unlimited_messages: plan.can_send_unlimited_messages === 1,
      profile_boost_count: plan.profile_boost_count,
      can_see_who_viewed: plan.can_see_who_viewed === 1,
      can_see_who_accepted: plan.can_see_who_accepted === 1,
      premium_badge: plan.premium_badge === 1,
      display_order: plan.display_order,
    });
    setEditModal({ open: true, plan });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      plan_name: '',
      plan_description: '',
      duration_days: 30,
      price: 0,
      max_matches_per_week: 10,
      can_view_contact: false,
      can_send_unlimited_messages: false,
      profile_boost_count: 0,
      can_see_who_viewed: false,
      can_see_who_accepted: false,
      premium_badge: false,
      display_order: plans.length + 1,
    });
  };

  // Get features list
  const getFeatures = (plan: SubscriptionPlan) => {
    const features = [];
    if (plan.can_view_contact === 1) features.push('View Contact Details');
    if (plan.can_send_unlimited_messages === 1) features.push('Unlimited Messages');
    if (plan.profile_boost_count > 0) features.push(`Profile Boost: ${plan.profile_boost_count}`);
    if (plan.can_see_who_viewed === 1) features.push('See Who Viewed');
    if (plan.can_see_who_accepted === 1) features.push('See Who Accepted');
    if (plan.premium_badge === 1) features.push('Premium Badge');
    features.push(`${plan.max_matches_per_week} Matches/Week`);
    return features;
  };

  // Format duration
  const formatDuration = (days: number) => {
    if (days < 30) return `${days} Days`;
    if (days < 365) return `${Math.floor(days / 30)} Month${Math.floor(days / 30) > 1 ? 's' : ''}`;
    return `${Math.floor(days / 365)} Year${Math.floor(days / 365) > 1 ? 's' : ''}`;
  };

  return (
    <>
      <Breadcrumb pageName="💎 Subscription Plans" />

      <div className="mb-6 flex items-center justify-end">
        <button
          onClick={() => {
            resetForm();
            setCreateModal(true);
          }}
          className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition"
        >
          + Create New Plan
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhol-500 border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading plans...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 mb-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchPlans}
            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Plans Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-dark-4 dark:text-dark-6">No plans found. Create your first plan!</p>
            </div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan.plan_id}
                className={`rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card ${
                  plan.is_active === 0 ? 'opacity-75' : ''
                }`}
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-heading-5 font-bold text-dark dark:text-white">
                      {plan.plan_name}
                    </h3>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      plan.is_active === 1 
                        ? 'bg-green-light-7 text-green' 
                        : 'bg-red-light-5 text-red'
                    }`}>
                      {plan.is_active === 1 ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  {plan.plan_description && (
                    <p className="text-body-sm text-dark-4 dark:text-dark-6 mb-3">
                      {plan.plan_description}
                    </p>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-heading-3 font-bold text-primary">
                      ₹{parseFloat(plan.price).toLocaleString('en-IN')}
                    </span>
                    <span className="ml-2 text-body-sm text-dark-4 dark:text-dark-6">
                      / {formatDuration(plan.duration_days)}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-body-sm font-medium text-dark-4 dark:text-dark-6">
                    Features:
                  </p>
                  <ul className="space-y-2">
                    {getFeatures(plan).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-body-sm text-dark dark:text-white">
                        <svg className="h-5 w-5 text-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(plan)}
                      disabled={actionLoading === plan.plan_id}
                      className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(plan)}
                      disabled={actionLoading === plan.plan_id}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white transition disabled:opacity-50 ${
                        plan.is_active === 1 
                          ? 'bg-orange hover:bg-orange-dark' 
                          : 'bg-green hover:bg-green-dark'
                      }`}
                    >
                      {actionLoading === plan.plan_id ? '...' : plan.is_active === 1 ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(plan.plan_id)}
                      disabled={actionLoading === plan.plan_id}
                      className="rounded-lg bg-red px-3 py-1.5 text-xs font-medium text-white hover:bg-red-dark transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Plan Modal */}
      {createModal && (
        <PlanModal
          title="Create New Plan"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreate}
          onClose={() => {
            setCreateModal(false);
            resetForm();
          }}
          loading={actionLoading === -1}
        />
      )}

      {/* Edit Plan Modal */}
      {editModal.open && editModal.plan && (
        <PlanModal
          title="Edit Plan"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdate}
          onClose={() => {
            setEditModal({ open: false, plan: null });
            resetForm();
          }}
          loading={actionLoading === editModal.plan.plan_id}
        />
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

// Plan Modal Component
function PlanModal({
  title,
  formData,
  setFormData,
  onSubmit,
  onClose,
  loading,
}: {
  title: string;
  formData: CreatePlanData;
  setFormData: (data: CreatePlanData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-heading-5 font-bold text-dark dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-4 hover:text-dark dark:text-gray-5 dark:hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Plan Name *
              </label>
              <input
                type="text"
                value={formData.plan_name}
                onChange={(e) => setFormData({ ...formData, plan_name: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Duration (Days) *
              </label>
              <input
                type="number"
                value={formData.duration_days}
                onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                required
                min="1"
              />
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Price (INR) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Max Matches/Week *
              </label>
              <input
                type="number"
                value={formData.max_matches_per_week}
                onChange={(e) => setFormData({ ...formData, max_matches_per_week: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                required
                min="0"
              />
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Profile Boost Count
              </label>
              <input
                type="number"
                value={formData.profile_boost_count}
                onChange={(e) => setFormData({ ...formData, profile_boost_count: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                min="0"
              />
            </div>

            <div>
              <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                Display Order
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
              Plan Description
            </label>
            <textarea
              value={formData.plan_description}
              onChange={(e) => setFormData({ ...formData, plan_description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-body-sm font-medium text-dark dark:text-white mb-3">
              Features:
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.can_view_contact}
                onChange={(e) => setFormData({ ...formData, can_view_contact: e.target.checked })}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary"
              />
              <span className="text-body-sm text-dark dark:text-white">Can View Contact</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.can_send_unlimited_messages}
                onChange={(e) => setFormData({ ...formData, can_send_unlimited_messages: e.target.checked })}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary"
              />
              <span className="text-body-sm text-dark dark:text-white">Unlimited Messages</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.can_see_who_viewed}
                onChange={(e) => setFormData({ ...formData, can_see_who_viewed: e.target.checked })}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary"
              />
              <span className="text-body-sm text-dark dark:text-white">See Who Viewed</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.can_see_who_accepted}
                onChange={(e) => setFormData({ ...formData, can_see_who_accepted: e.target.checked })}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary"
              />
              <span className="text-body-sm text-dark dark:text-white">See Who Accepted</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.premium_badge}
                onChange={(e) => setFormData({ ...formData, premium_badge: e.target.checked })}
                className="h-5 w-5 rounded border-stroke text-primary focus:ring-primary"
              />
              <span className="text-body-sm text-dark dark:text-white">Premium Badge</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-stroke px-4 py-3 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-primary px-4 py-3 font-medium text-white hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : title.includes('Create') ? 'Create Plan' : 'Update Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
