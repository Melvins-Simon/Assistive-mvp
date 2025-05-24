import { useContext, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { FaTrash, FaArrowLeft, FaLock, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Adjustable Wheelchair",
      price: 12500,
      quantity: 1,
      image:
        "https://www.esleh.com/wp-content/uploads/2023/03/132A9892-scaled.jpg",
      couponApplied: true,
      couponAmount: 3750, // 30% off
    },
    {
      id: 2,
      name: "Tactile Walking Stick",
      price: 1500,
      quantity: 2,
      image:
        "https://lhblind.org/wp-content/uploads/2021/10/AdobeStock_231187109-web_835x555_opt.jpg",
      couponApplied: false,
      couponAmount: 0,
    },
  ]);

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

  const secondaryButtonClasses = highContrast
    ? "bg-gray-800 text-white hover:bg-gray-700"
    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price - item.couponAmount) * item.quantity,
      0
    );
  };

  const calculateDiscounts = () => {
    return cartItems.reduce(
      (total, item) => total + item.couponAmount * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/products"
            className={`flex items-center ${
              highContrast ? "text-yellow-300" : "text-indigo-600"
            }`}
          >
            <FaArrowLeft className="mr-2" />
            {t("continueShopping")}
          </Link>
          <h1 className="text-3xl font-bold">{t("yourCart")}</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-12 text-center rounded-lg ${
              highContrast ? "bg-gray-900" : "bg-indigo-50"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">{t("cartEmpty")}</h2>
            <p className="mb-6 max-w-md mx-auto">{t("cartEmptyMessage")}</p>
            <Link
              to="/products"
              className={`inline-block px-6 py-3 rounded-lg font-semibold ${buttonClasses}`}
            >
              {t("browseProducts")}
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-lg ${
                  highContrast
                    ? "bg-gray-900 border border-white"
                    : "bg-white shadow-sm"
                }`}
              >
                <h2 className="text-xl font-bold mb-6">
                  {t("cartItems")} ({cartItems.length})
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex flex-col sm:flex-row gap-4 p-4 rounded-lg ${
                        highContrast ? "bg-gray-800" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className={`p-1 rounded-full ${
                              highContrast
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-200"
                            }`}
                            aria-label={t("removeItem")}
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="mt-2">
                          <span
                            className={`font-semibold ${
                              highContrast
                                ? "text-yellow-300"
                                : "text-indigo-600"
                            }`}
                          >
                            KSh{" "}
                            {(item.price - item.couponAmount).toLocaleString()}
                          </span>
                          {item.couponApplied && (
                            <div className="flex items-center text-sm">
                              <span className="line-through text-gray-500 mr-2">
                                KSh {item.price.toLocaleString()}
                              </span>
                              <span
                                className={`px-1 rounded ${
                                  highContrast
                                    ? "bg-yellow-300 text-black"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                -KSh {item.couponAmount.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className={`p-2 rounded-l ${
                              highContrast
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            aria-label={t("decreaseQuantity")}
                          >
                            <FaMinus size={12} />
                          </button>
                          <div
                            className={`px-4 py-2 ${
                              highContrast ? "bg-gray-700" : "bg-white"
                            }`}
                          >
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className={`p-2 rounded-r ${
                              highContrast
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                            aria-label={t("increaseQuantity")}
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Coupon Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`mt-6 p-6 rounded-lg ${
                  highContrast
                    ? "bg-gray-900 border border-white"
                    : "bg-white shadow-sm"
                }`}
              >
                <h3 className="font-bold mb-4">{t("haveCoupon")}</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder={t("enterCouponCode")}
                    className={`flex-1 p-3 border rounded-l-lg ${
                      highContrast ? "bg-white text-black" : "bg-white"
                    }`}
                  />
                  <button
                    className={`px-6 py-3 rounded-r-lg font-semibold ${
                      highContrast
                        ? "bg-yellow-300 text-black hover:bg-yellow-400"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {t("applyCoupon")}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-lg sticky top-6 ${
                  highContrast
                    ? "bg-gray-900 border border-white"
                    : "bg-white shadow-md"
                }`}
              >
                <h2 className="text-xl font-bold mb-6">{t("orderSummary")}</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>KSh {calculateSubtotal().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{t("discounts")}</span>
                    <span className="text-green-600">
                      -KSh {calculateDiscounts().toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>{t("delivery")}</span>
                    <span>{t("free")}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>{t("total")}</span>
                    <span>KSh {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/checkout"
                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center ${buttonClasses}`}
                  >
                    <FaLock className="mr-2" />
                    {t("proceedToCheckout")}
                  </Link>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm flex items-center justify-center">
                    <FaLock className="mr-1" />
                    {t("secureCheckout")}
                  </p>
                </div>
              </motion.div>

              {/* Support Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`mt-6 p-6 rounded-lg ${
                  highContrast
                    ? "bg-gray-900 border border-white"
                    : "bg-indigo-50"
                }`}
              >
                <h3 className="font-bold mb-3">{t("needHelp")}</h3>
                <p className="text-sm mb-4">{t("cartSupportMessage")}</p>
                <button
                  className={`w-full py-2 rounded-lg ${secondaryButtonClasses}`}
                >
                  {t("contactSupport")}
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
