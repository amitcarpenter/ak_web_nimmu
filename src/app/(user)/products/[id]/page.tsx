"use client";

import { use } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiStar, FiClock, FiTruck, FiHeart, FiShare2, FiChevronLeft, FiInfo, FiMinus, FiPlus } from "react-icons/fi";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("regular");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");

  // Get product based on ID - in real app, fetch from API
  const getProductImage = (productId: string) => {
    const imageMap: Record<string, string> = {
      "1": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&h=1200&fit=crop&q=90",
      "2": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=1200&fit=crop&q=90",
      "3": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&h=1200&fit=crop&q=90",
      "4": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=1200&fit=crop&q=90",
      "5": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&h=1200&fit=crop&q=90",
      "6": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=1200&fit=crop&q=90",
    };
    return imageMap[productId] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=1200&fit=crop&q=90";
  };

  const product = {
    id: 1,
    name: "Chicken Biryani Combo",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 234,
    prepTime: "30 min",
    deliveryTime: "30-40 min",
    inStock: true,
    sku: "CHB-001",
    image: getProductImage(id),
    description: "Delicious chicken biryani with aromatic basmati rice, tender chicken pieces, and a blend of traditional spices. Served with raita and pickle.",
    ingredients: ["Basmati Rice", "Chicken", "Onions", "Tomatoes", "Yogurt", "Spices", "Ghee", "Mint", "Coriander"],
    allergens: ["Dairy", "Gluten"],
    dietary: "Non-Veg",
    vendor: {
      name: "Spice Kitchen",
      rating: 4.6,
      deliveryTime: "30-40 min",
    },
  };

  const variants = [
    { id: "regular", name: "Regular", price: 299, description: "Serves 1-2" },
    { id: "large", name: "Large", price: 449, description: "Serves 2-3" },
    { id: "family", name: "Family Pack", price: 699, description: "Serves 4-5" },
  ];

  const addons = [
    { id: "raita", name: "Extra Raita", price: 30 },
    { id: "pickle", name: "Extra Pickle", price: 20 },
    { id: "salad", name: "Fresh Salad", price: 40 },
    { id: "papad", name: "Papad", price: 15 },
  ];

  const nutrition = {
    calories: 650,
    protein: "28g",
    carbs: "85g",
    fat: "18g",
    fiber: "3g",
    sodium: "1200mg",
  };

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      date: "2 days ago",
      comment: "Amazing biryani! Very flavorful and the chicken was tender.",
      verified: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      date: "1 week ago",
      comment: "Good taste but could use more spices. Delivery was fast.",
      verified: true,
    },
  ];

  const totalPrice = variants.find(v => v.id === selectedVariant)?.price || product.price;
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);
  const finalPrice = (totalPrice + addonsPrice) * quantity;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="text-dark-5 dark:text-dark-6 hover:text-primary">Home</Link></li>
          <li className="text-dark-5 dark:text-dark-6">/</li>
          <li><Link href="/categories" className="text-dark-5 dark:text-dark-6 hover:text-primary">Categories</Link></li>
          <li className="text-dark-5 dark:text-dark-6">/</li>
          <li className="text-dark dark:text-white font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-2 dark:bg-[#020D1A] rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4">
            {product.inStock ? (
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded">In Stock</span>
            ) : (
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded">Out of Stock</span>
            )}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/90 dark:bg-gray-dark/90 rounded-full hover:bg-primary hover:text-white transition-colors">
              <FiHeart />
            </button>
            <button className="p-2 bg-white/90 dark:bg-gray-dark/90 rounded-full hover:bg-primary hover:text-white transition-colors">
              <FiShare2 />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Link href="/categories" className="inline-flex items-center text-primary hover:underline mb-4">
            <FiChevronLeft className="mr-1" />
            Back to Categories
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-semibold">{product.rating}</span>
              <span className="ml-1 text-dark-5 dark:text-dark-6">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-dark-5 dark:text-dark-6">
              <FiClock className="mr-1" />
              {product.prepTime}
            </div>
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {product.dietary}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-dark dark:text-white">₹{totalPrice}</span>
              {product.originalPrice && (
                <span className="text-xl text-dark-5 dark:text-dark-6 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-green-500 text-white text-sm font-semibold rounded">
                  {Math.round((1 - totalPrice / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>
            <p className="text-sm text-dark-5 dark:text-dark-6">SKU: {product.sku}</p>
          </div>

          {/* Variants */}
          <div className="mb-6">
            <h3 className="font-semibold text-dark dark:text-white mb-3">Select Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    selectedVariant === variant.id
                      ? "border-primary bg-primary/10"
                      : "border-stroke dark:border-stroke-dark hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-dark dark:text-white">{variant.name}</div>
                  <div className="text-sm text-dark-5 dark:text-dark-6">{variant.description}</div>
                  <div className="text-sm font-medium text-primary mt-1">₹{variant.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-6">
            <h3 className="font-semibold text-dark dark:text-white mb-3">Add-ons (Optional)</h3>
            <div className="space-y-2">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-3 border border-stroke dark:border-stroke-dark rounded-lg hover:border-primary cursor-pointer"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAddons([...selectedAddons, addon.id]);
                        } else {
                          setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                        }
                      }}
                      className="rounded border-stroke text-primary focus:ring-primary"
                    />
                    <span className="ml-3 text-dark dark:text-white">{addon.name}</span>
                  </div>
                  <span className="text-dark dark:text-white font-medium">+₹{addon.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold text-dark dark:text-white mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stroke dark:border-stroke-dark rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                >
                  <FiMinus />
                </button>
                <span className="px-4 py-2 font-semibold text-dark dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-2 dark:hover:bg-[#020D1A]"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              disabled={!product.inStock}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart - ₹{finalPrice}
            </button>
            <button
              disabled={!product.inStock}
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-2 dark:bg-[#020D1A] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FiTruck className="text-primary mt-1" />
              <div>
                <p className="font-semibold text-dark dark:text-white">Free delivery on orders above ₹500</p>
                <p className="text-sm text-dark-5 dark:text-dark-6">Estimated delivery: {product.deliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Allergens Warning */}
          {product.allergens.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2">
                <FiInfo className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Contains Allergens</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This product contains: {product.allergens.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-stroke dark:border-stroke-dark">
          <div className="flex gap-6">
            {[
              { id: "description", label: "Description" },
              { id: "nutrition", label: "Nutrition Info" },
              { id: "reviews", label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-dark-5 dark:text-dark-6 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <div>
              <p className="text-dark-5 dark:text-dark-6 mb-4">{product.description}</p>
              <div>
                <h4 className="font-semibold text-dark dark:text-white mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-dark-5 dark:text-dark-6 space-y-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-2 dark:bg-[#020D1A] rounded-lg p-4">
                <div className="text-2xl font-bold text-dark dark:text-white mb-1">{nutrition.calories}</div>
                <div className="text-sm text-dark-5 dark:text-dark-6">Calories</div>
              </div>
              <div className="bg-gray-2 dark:bg-[#020D1A] rounded-lg p-4">
                <div className="text-2xl font-bold text-dark dark:text-white mb-1">{nutrition.protein}</div>
                <div className="text-sm text-dark-5 dark:text-dark-6">Protein</div>
              </div>
              <div className="bg-gray-2 dark:bg-[#020D1A] rounded-lg p-4">
                <div className="text-2xl font-bold text-dark dark:text-white mb-1">{nutrition.carbs}</div>
                <div className="text-sm text-dark-5 dark:text-dark-6">Carbohydrates</div>
              </div>
              <div className="bg-gray-2 dark:bg-[#020D1A] rounded-lg p-4">
                <div className="text-2xl font-bold text-dark dark:text-white mb-1">{nutrition.fat}</div>
                <div className="text-sm text-dark-5 dark:text-dark-6">Fat</div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-stroke dark:border-stroke-dark pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-dark dark:text-white">{review.user}</span>
                        {review.verified && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-dark-5 dark:text-dark-6">{review.date}</span>
                  </div>
                  <p className="text-dark-5 dark:text-dark-6">{review.comment}</p>
                </div>
              ))}
              <button className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

