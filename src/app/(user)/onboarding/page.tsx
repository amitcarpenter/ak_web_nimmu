"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to FoodHub!",
      description: "Your one-stop destination for fresh food and groceries",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      features: [
        "Fresh groceries delivered to your door",
        "Prepared meals ready in minutes",
        "Fast and reliable delivery",
      ],
    },
    {
      title: "Browse & Order",
      description: "Explore our wide range of products and categories",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      features: [
        "Browse by categories",
        "Search for your favorite items",
        "Add to cart with one click",
      ],
    },
    {
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and safely",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
      features: [
        "30-40 minute delivery",
        "Real-time order tracking",
        "Safe and contactless delivery",
      ],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete
      localStorage.setItem("onboarding_complete", "true");
      router.push("/");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_complete", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="text-dark-5 dark:text-dark-6 hover:text-primary transition-colors flex items-center gap-2"
          >
            Skip
            <FiX />
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-dark border border-stroke dark:border-stroke-dark rounded-2xl p-8 shadow-xl">
          {/* Image */}
          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-primary"
                    : index < currentStep
                    ? "w-2 bg-primary/50"
                    : "w-2 bg-gray-2 dark:bg-[#020D1A]"
                }`}
              />
            ))}
          </div>

          {/* Title & Description */}
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-3 text-center">
            {steps[currentStep].title}
          </h2>
          <p className="text-lg text-dark-5 dark:text-dark-6 mb-6 text-center">
            {steps[currentStep].description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {steps[currentStep].features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiCheck className="text-primary" />
                </div>
                <span className="text-dark dark:text-white">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 px-6 py-3 border border-stroke dark:border-stroke-dark rounded-lg font-semibold hover:bg-gray-2 dark:hover:bg-[#020D1A] transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

