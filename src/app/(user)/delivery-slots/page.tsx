"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCalendar, FiClock, FiCheck, FiChevronLeft } from "react-icons/fi";

export default function DeliverySlotsPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const timeSlots = [
    { id: "morning-1", label: "9:00 AM - 11:00 AM", available: true },
    { id: "morning-2", label: "11:00 AM - 1:00 PM", available: true },
    { id: "afternoon-1", label: "1:00 PM - 3:00 PM", available: true },
    { id: "afternoon-2", label: "3:00 PM - 5:00 PM", available: false },
    { id: "evening-1", label: "5:00 PM - 7:00 PM", available: true },
    { id: "evening-2", label: "7:00 PM - 9:00 PM", available: true },
    { id: "night-1", label: "9:00 PM - 11:00 PM", available: true },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/checkout" className="inline-flex items-center text-primary hover:underline mb-6">
        <FiChevronLeft className="mr-1" />
        Back to Checkout
      </Link>

      <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">Select Delivery Slot</h1>

      <div className="max-w-4xl mx-auto">
        {/* Date Selection */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4 flex items-center gap-2">
            <FiCalendar />
            Select Date
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {dates.map((date) => {
              const dateStr = date.toISOString().split("T")[0];
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-semibold text-dark dark:text-white">
                    {formatDate(date)}
                  </div>
                  {isToday(date) && (
                    <div className="text-xs text-primary mt-1">Today</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDate && (
          <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white mb-4 flex items-center gap-2">
              <FiClock />
              Select Time Slot
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : slot.available
                        ? "border-stroke dark:border-stroke-dark hover:border-primary/50"
                        : "border-stroke dark:border-stroke-dark opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-dark dark:text-white">{slot.label}</span>
                      {isSelected && <FiCheck className="text-primary" />}
                      {!slot.available && (
                        <span className="text-xs text-red">Unavailable</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        {selectedDate && selectedSlot && (
          <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-dark dark:text-white mb-2">Selected Slot</h3>
            <p className="text-dark-5 dark:text-dark-6 mb-1">
              <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-dark-5 dark:text-dark-6">
              <strong>Time:</strong> {timeSlots.find((s) => s.id === selectedSlot)?.label}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/checkout"
            className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg font-semibold text-center hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors"
          >
            Cancel
          </Link>
          <button
            disabled={!selectedDate || !selectedSlot}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Slot
          </button>
        </div>
      </div>
    </div>
  );
}

