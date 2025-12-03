'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { adminProfileService, AdminProfile } from '@/services/api/admin.service';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminProfileService.getProfile();
        
        if (response.success && response.data) {
          setProfile(response.data);
          setFormData({
            full_name: response.data.full_name,
          });
        } else {
          setError(response.message || 'Failed to fetch profile');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format date for "Member Since"
  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    });
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);
    
    if (!formData.full_name.trim()) {
      setUpdateError('Full name is required');
      return;
    }

    try {
      setSaving(true);
      const response = await adminProfileService.updateProfile({
        full_name: formData.full_name.trim(),
      });
      
      if (response.success && response.data) {
        setProfile(response.data);
        setFormData({
          full_name: response.data.full_name,
        });
        setUpdateError(null);
        setUpdateSuccess('Profile updated successfully!');
        
        // Update localStorage so header can pick up the changes
        localStorage.setItem('admin_data', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Dispatch custom event to notify header of profile update
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('profileUpdated', { 
            detail: response.data 
          }));
        }
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setUpdateSuccess(null);
        }, 5000);
      } else {
        setUpdateError(response.message || 'Failed to update profile');
      }
    } catch (err: any) {
      setUpdateError(err.message || 'An error occurred while updating profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    
    // Validation
    if (!passwordData.current_password) {
      setPasswordError('Current password is required');
      return;
    }

    if (!passwordData.new_password) {
      setPasswordError('New password is required');
      return;
    }

    if (passwordData.new_password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    try {
      setPasswordSaving(true);
      const response = await adminProfileService.changePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      
      if (response.success) {
        setPasswordError(null);
        setPasswordSuccess('Password changed successfully!');
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setPasswordSuccess(null);
        }, 5000);
      } else {
        // Handle error response (e.g., 401 for incorrect password)
        setPasswordError(response.message || 'Failed to change password');
      }
    } catch (err: any) {
      // Handle API errors
      if (err.status === 401) {
        setPasswordError('Current password is incorrect');
      } else {
        setPasswordError(err.message || 'An error occurred while changing password');
      }
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Breadcrumb pageName="👤 Admin Profile" />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-dhol-500 border-r-transparent"></div>
            <p className="mt-4 text-dark-5">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Breadcrumb pageName="👤 Admin Profile" />
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Breadcrumb pageName="👤 Admin Profile" />
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-dark-5">No profile data available</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="👤 Admin Profile" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
              Profile Information
            </h3>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => {
                      setFormData({ ...formData, full_name: e.target.value });
                      setUpdateError(null);
                    }}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 outline-none focus:border-primary dark:border-strokedark"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full rounded-lg border border-stroke bg-gray-2 px-4 py-3 outline-none dark:bg-dark-2 dark:border-strokedark cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full rounded-lg border border-stroke bg-gray-2 px-4 py-3 outline-none dark:bg-dark-2 dark:border-strokedark cursor-not-allowed"
                  />
                </div>

                {updateError && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{updateError}</p>
                  </div>
                )}

                {updateSuccess && (
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-600 dark:text-green-400">{updateSuccess}</p>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-6 text-heading-6 font-bold text-dark dark:text-white">
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.current_password}
                      onChange={(e) => {
                        setPasswordData({ ...passwordData, current_password: e.target.value });
                        setPasswordError(null);
                      }}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 pr-12 outline-none focus:border-primary dark:border-strokedark"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-4 hover:text-primary dark:text-gray-5 dark:hover:text-primary"
                    >
                      {showPasswords.current ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.new_password}
                      onChange={(e) => {
                        setPasswordData({ ...passwordData, new_password: e.target.value });
                        setPasswordError(null);
                      }}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 pr-12 outline-none focus:border-primary dark:border-strokedark"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-4 hover:text-primary dark:text-gray-5 dark:hover:text-primary"
                    >
                      {showPasswords.new ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-body-sm font-medium text-dark dark:text-white">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirm_password}
                      onChange={(e) => {
                        setPasswordData({ ...passwordData, confirm_password: e.target.value });
                        setPasswordError(null);
                      }}
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 pr-12 outline-none focus:border-primary dark:border-strokedark"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-4 hover:text-primary dark:text-gray-5 dark:hover:text-primary"
                    >
                      {showPasswords.confirm ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-600 dark:text-green-400">{passwordSuccess}</p>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={passwordSaving}
                  className="w-full rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {passwordSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile Card */}
        <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="text-center">
            {/* Application Logo as Profile Image */}
            <div className="mx-auto mb-4 flex items-center justify-center">
              <Image
                src="/images/logo/food_hub_logo.png"
                alt="FoodHub Logo"
                width={180}
                height={65}
                className="h-16 w-auto"
                priority
              />
            </div>
            <h4 className="text-heading-6 font-bold text-dark dark:text-white">
              {profile.full_name}
            </h4>
            <p className="mt-1 text-body-sm text-dark-4 dark:text-dark-6 capitalize">
              {profile.role.replace('_', ' ')}
            </p>
            <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
              {profile.email}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between border-t border-stroke pt-3 dark:border-strokedark">
                <span className="text-body-sm text-dark-4 dark:text-dark-6">Last Login:</span>
                <span className="text-body-sm font-medium text-dark dark:text-white">
                  {formatDate(profile.last_login)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-stroke pt-3 dark:border-strokedark">
                <span className="text-body-sm text-dark-4 dark:text-dark-6">Member Since:</span>
                <span className="text-body-sm font-medium text-dark dark:text-white">
                  {formatMemberSince(profile.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-stroke pt-3 dark:border-strokedark">
                <span className="text-body-sm text-dark-4 dark:text-dark-6">Status:</span>
                <span className={`text-body-sm font-medium ${
                  profile.is_active === 1 ? 'text-green' : 'text-red'
                }`}>
                  {profile.is_active === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
