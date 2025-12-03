"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiEdit2, FiTrash2, FiPlus, FiHome, FiBriefcase, FiCheck } from "react-icons/fi";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123, Main Street",
      landmark: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "456, Business Park",
      landmark: "Sector 5",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400052",
      isDefault: false,
    },
    {
      id: 3,
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "789, Residential Complex",
      landmark: "Block A",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400070",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const getTypeIcon = (type: string) => {
    return type === "home" ? FiHome : FiBriefcase;
  };

  const getTypeLabel = (type: string) => {
    return type === "home" ? "Home" : "Work";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/account"
            className="text-primary hover:underline mb-2 inline-block"
          >
            ← Back to Account
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            My Addresses
          </h1>
          <p className="text-dark-5 dark:text-dark-6 mt-2">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="h-5 w-5" />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg">
          <FiMapPin className="h-16 w-16 text-dark-5 dark:text-dark-6 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
            No addresses saved
          </h3>
          <p className="text-dark-5 dark:text-dark-6 mb-6">
            Add your first delivery address to get started
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => {
            const TypeIcon = getTypeIcon(address.type);
            return (
              <div
                key={address.id}
                className={`relative bg-white dark:bg-gray-dark border-2 rounded-lg p-6 ${
                  address.isDefault
                    ? "border-primary"
                    : "border-stroke dark:border-stroke-dark"
                }`}
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      Default
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TypeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-dark dark:text-white">
                        {getTypeLabel(address.type)}
                      </h3>
                    </div>
                    <p className="text-sm text-dark-5 dark:text-dark-6">
                      {address.name}
                    </p>
                    <p className="text-sm text-dark-5 dark:text-dark-6">
                      {address.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 mb-4 text-dark dark:text-white">
                  <p>{address.address}</p>
                  {address.landmark && (
                    <p className="text-dark-5 dark:text-dark-6">
                      {address.landmark}
                    </p>
                  )}
                  <p className="text-dark-5 dark:text-dark-6">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-stroke dark:border-stroke-dark">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiCheck className="h-4 w-4" />
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => setEditingId(address.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <FiEdit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {(showAddForm || editingId) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stroke dark:border-stroke-dark">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
            </div>

            <form
              className="p-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddForm(false);
                setEditingId(null);
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Address Type
                  </label>
                  <select className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white">
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Enter full name"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.name : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Enter phone number"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.phone : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Enter pincode"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.pincode : ""}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="House/Flat No., Building Name"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.address : ""}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Nearby landmark"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.landmark : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Enter city"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.city : ""}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-stroke dark:border-stroke-dark rounded-lg bg-white dark:bg-gray-dark text-dark dark:text-white"
                    placeholder="Enter state"
                    defaultValue={editingId ? addresses.find(a => a.id === editingId)?.state : ""}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary border-stroke dark:border-stroke-dark rounded"
                      defaultChecked={editingId ? addresses.find(a => a.id === editingId)?.isDefault : false}
                    />
                    <span className="text-sm text-dark dark:text-white">
                      Set as default address
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-stroke dark:border-stroke-dark">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-dark dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

