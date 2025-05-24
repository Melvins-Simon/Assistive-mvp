import { useParams } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useContext, useState, useEffect } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { products } from "../data/products";
import ProductGallery from "../components/ProductGallery";
import ReviewList from "../components/ReviewList";
import { FaShoppingCart, FaGift, FaCheckCircle, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [quantity, setQuantity] = useState(1);
  const [useDonationCoupon, setUseDonationCoupon] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [cart, setCart] = useState([]);
  const product = products.find((p) => p.id === parseInt(id));

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("assistiveTechCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("assistiveTechCart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <div>{t("productNotFound")}</div>;
  }

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-white text-gray-800";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-indigo-600 text-white hover:bg-indigo-700";

  const validateCoupon = () => {
    // In a real app, this would call an API to validate the coupon
    // For demo purposes, we'll accept any code that starts with "DONATE"
    const isValid = couponCode.startsWith("DONATE");
    setCouponValid(isValid);
    if (!isValid) {
      setCouponAmount(0);
    }
    return isValid;
  };

  const applyCoupon = () => {
    if (validateCoupon()) {
      // Set the coupon amount to maximum 30% of product price
      const maxDiscount = product.price * quantity * 1;
      setCouponAmount(Math.min(maxDiscount, couponAmount));
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponAmount(0);
    setCouponValid(false);
    setUseDonationCoupon(false);
  };

  const calculatePrice = () => {
    const basePrice = product.price * quantity;
    return basePrice - (couponValid ? couponAmount : 0);
  };

  const addToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);

    const cartItem = {
      ...product,
      quantity,
      couponApplied: couponValid,
      couponAmount: couponValid ? couponAmount : 0,
      couponCode: couponValid ? couponCode : "",
      finalPrice: calculatePrice(),
    };

    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? cartItem : item)));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <ProductGallery
            images={[product.image]}
            highContrast={highContrast}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price Display */}
          <div className="mb-6">
            <div
              className={`text-2xl font-semibold ${
                highContrast ? "text-yellow-300" : "text-indigo-600"
              }`}
            >
              KSh {calculatePrice().toLocaleString()}
            </div>

            {couponValid && (
              <div className="mt-2">
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 rounded text-sm mr-2 ${
                      highContrast
                        ? "bg-yellow-300 text-black"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {t("donationDiscount")}
                  </span>
                  <span className="text-sm line-through mr-2">
                    KSh {(product.price * quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove coupon"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="text-sm mt-1">
                  {t("couponApplied")}: -KSh {couponAmount.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                highContrast
                  ? "bg-white text-black"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {t(product.category)}
            </span>
          </div>

          <p className="mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2 font-medium">
              {t("quantity")}
            </label>
            <select
              id="quantity"
              className={`p-2 border rounded ${
                highContrast ? "bg-white text-black" : "bg-white text-gray-800"
              }`}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Donation Coupon Section */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="donation-coupon"
                checked={useDonationCoupon}
                onChange={() => {
                  setUseDonationCoupon(!useDonationCoupon);
                  if (useDonationCoupon) {
                    removeCoupon();
                  }
                }}
                className="mr-2 h-5 w-5"
              />
              <label htmlFor="donation-coupon" className="flex items-center">
                <FaGift className="mr-2" />
                {t("useDonationCoupon")}
              </label>
            </div>

            {useDonationCoupon && (
              <div className="ml-7 mt-3 space-y-3">
                <div>
                  <label
                    htmlFor="coupon-code"
                    className="block mb-1 text-sm font-medium"
                  >
                    {t("couponCode")}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon-code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className={`flex-1 p-2 border rounded-l ${
                        highContrast
                          ? "bg-white text-black"
                          : "bg-white text-gray-800"
                      }`}
                      placeholder="DONATE123"
                    />
                    <button
                      onClick={applyCoupon}
                      className={`px-4 py-2 rounded-r ${
                        highContrast
                          ? "bg-yellow-300 text-black hover:bg-yellow-400"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {t("apply")}
                    </button>
                  </div>
                  {couponCode && !couponValid && (
                    <p className="text-red-500 text-sm mt-1">
                      {t("invalidCoupon")}
                    </p>
                  )}
                </div>

                {couponValid && (
                  <div>
                    <label
                      htmlFor="coupon-amount"
                      className="block mb-1 text-sm font-medium"
                    >
                      {t("couponAmount")} (Max: KSh{" "}
                      {Math.floor(
                        product.price * quantity * 0.3
                      ).toLocaleString()}
                      )
                    </label>
                    <input
                      type="number"
                      id="coupon-amount"
                      value={couponAmount}
                      onChange={(e) =>
                        setCouponAmount(parseInt(e.target.value) || 0)
                      }
                      min="0"
                      max={product.price * quantity * 0.3}
                      className={`w-full p-2 border rounded ${
                        highContrast
                          ? "bg-white text-black"
                          : "bg-white text-gray-800"
                      }`}
                    />
                    <button
                      onClick={applyCoupon}
                      className={`mt-2 w-full py-2 rounded ${
                        highContrast
                          ? "bg-yellow-300 text-black hover:bg-yellow-400"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {t("updateAmount")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addToCart}
              className={`flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition ${buttonClasses}`}
            >
              <FaShoppingCart className="mr-2" />
              {t("addToCart")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                addToCart();
                // Navigate to checkout
                window.location.href = "/checkout";
              }}
              className={`flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition ${
                highContrast
                  ? "bg-yellow-300 text-black hover:bg-yellow-400"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <FaCheckCircle className="mr-2" />
              {t("buyNow")}
            </motion.button>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">{t("specifications")}</h2>
            <ul className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="flex">
                  <span className="font-semibold w-1/3">{t(key)}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("reviews")}</h2>
        <ReviewList reviews={product.reviews} highContrast={highContrast} />
      </div>

      {/* Seller Information */}
      <div
        className={`p-6 rounded-lg ${
          highContrast ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">{t("sellerInformation")}</h2>
        <p>{t("sellerDescription")}</p>
      </div>
    </div>
  );
}
