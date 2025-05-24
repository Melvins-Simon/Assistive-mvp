import { useState, useEffect, useContext } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaLock,
  FaMobileAlt,
  FaCreditCard,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("assistiveTechCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

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

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + (item.finalPrice || item.price * item.quantity),
      0
    );
  };

  const deliveryOptions = {
    standard: { price: 200, days: "3-5", label: t("standardDelivery") },
    express: { price: 500, days: "1-2", label: t("expressDelivery") },
    pickup: { price: 0, days: t("pickup"), label: t("storePickup") },
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCost = deliveryOptions[deliveryOption].price;
    return subtotal + deliveryCost;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    try {
      // In a real app, you would call your payment API here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll simulate a successful payment
      setOrderSuccess(true);

      // Clear cart on successful payment
      localStorage.removeItem("assistiveTechCart");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPhoneNumber = (value) => {
    // Format Kenyan phone number (e.g., 712345678 -> 0712 345 678)
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,3})$/);
    if (!match) return value;

    const formatted = [
      match[1] ? `0${match[1]}` : "",
      match[2] ? ` ${match[2]}` : "",
      match[3] ? ` ${match[3]}` : "",
      match[4] ? ` ${match[4]}` : "",
    ].join("");

    return formatted.trim();
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  if (orderSuccess) {
    return (
      <div
        className={`min-h-screen py-12 ${textSizes[textSize]} ${contrastClasses}`}
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">{t("orderConfirmed")}</h1>
            <p className="text-xl mb-6">{t("thankYouMessage")}</p>
            <p className="mb-8">{t("orderConfirmationDetails")}</p>

            <button
              onClick={() => navigate("/products")}
              className={`px-6 py-3 rounded-lg font-semibold ${
                highContrast
                  ? "bg-yellow-300 text-black hover:bg-yellow-400"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {t("continueShopping")}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center mb-6 ${
            highContrast ? "text-yellow-300" : "text-indigo-600"
          }`}
        >
          <FaArrowLeft className="mr-2" />
          {t("backToCart")}
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Delivery and Payment */}
          <div className="md:col-span-2 space-y-8">
            {/* Delivery Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-lg ${
                highContrast
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">{t("deliveryOptions")}</h2>

              <div className="space-y-3">
                {Object.entries(deliveryOptions).map(([key, option]) => (
                  <div
                    key={key}
                    onClick={() => setDeliveryOption(key)}
                    className={`p-4 rounded-lg cursor-pointer transition ${
                      deliveryOption === key
                        ? highContrast
                          ? "bg-yellow-300 text-black"
                          : "bg-indigo-100 border-indigo-500 text-indigo-800"
                        : highContrast
                        ? "hover:bg-gray-800 border border-gray-600"
                        : "hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{option.label}</h3>
                        <p className="text-sm">
                          {key !== "pickup"
                            ? `${t("deliveryTime")}: ${option.days} ${t(
                                "days"
                              )}`
                            : option.days}
                        </p>
                      </div>
                      <div className="font-semibold">
                        {option.price > 0
                          ? `KSh ${option.price.toLocaleString()}`
                          : t("free")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-lg ${
                highContrast
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">{t("paymentMethod")}</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center transition ${
                    paymentMethod === "mpesa"
                      ? highContrast
                        ? "bg-yellow-300 text-black"
                        : "bg-green-100 border-green-500 text-green-800"
                      : highContrast
                      ? "hover:bg-gray-800 border border-gray-600"
                      : "hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <FaMobileAlt className="text-2xl mb-2" />
                  <span>M-Pesa</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center transition ${
                    paymentMethod === "card"
                      ? highContrast
                        ? "bg-yellow-300 text-black"
                        : "bg-blue-100 border-blue-500 text-blue-800"
                      : highContrast
                      ? "hover:bg-gray-800 border border-gray-600"
                      : "hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <FaCreditCard className="text-2xl mb-2" />
                  <span>{t("creditCard")}</span>
                </button>
              </div>

              {paymentMethod === "mpesa" ? (
                <div>
                  <label
                    htmlFor="mpesa-phone"
                    className="block mb-2 font-medium"
                  >
                    {t("mpesaPhoneNumber")}
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                        highContrast ? "text-yellow-300" : "text-gray-500"
                      }`}
                    >
                      +254
                    </div>
                    <input
                      type="tel"
                      id="mpesa-phone"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="712 345 678"
                      maxLength={12}
                      className={`w-full pl-16 p-3 border rounded-lg ${
                        highContrast
                          ? "bg-white text-black"
                          : "bg-white text-gray-800"
                      }`}
                    />
                  </div>
                  <p className="text-sm mt-2">{t("mpesaInstructions")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="card-number"
                      className="block mb-2 font-medium"
                    >
                      {t("cardNumber")}
                    </label>
                    <input
                      type="text"
                      id="card-number"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value,
                        })
                      }
                      placeholder="4242 4242 4242 4242"
                      className={`w-full p-3 border rounded-lg ${
                        highContrast
                          ? "bg-white text-black"
                          : "bg-white text-gray-800"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="card-name"
                      className="block mb-2 font-medium"
                    >
                      {t("cardHolderName")}
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, name: e.target.value })
                      }
                      placeholder={t("nameOnCard")}
                      className={`w-full p-3 border rounded-lg ${
                        highContrast
                          ? "bg-white text-black"
                          : "bg-white text-gray-800"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="card-expiry"
                        className="block mb-2 font-medium"
                      >
                        {t("expiryDate")}
                      </label>
                      <input
                        type="text"
                        id="card-expiry"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        className={`w-full p-3 border rounded-lg ${
                          highContrast
                            ? "bg-white text-black"
                            : "bg-white text-gray-800"
                        }`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="card-cvv"
                        className="block mb-2 font-medium"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="card-cvv"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        className={`w-full p-3 border rounded-lg ${
                          highContrast
                            ? "bg-white text-black"
                            : "bg-white text-gray-800"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-lg sticky top-6 ${
                highContrast
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">{t("orderSummary")}</h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm">
                        {item.quantity} × KSh {item.price.toLocaleString()}
                        {item.couponApplied && (
                          <span
                            className={`ml-2 px-1 text-xs rounded ${
                              highContrast
                                ? "bg-yellow-300 text-black"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            -KSh {item.couponAmount.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="font-semibold">
                      KSh{" "}
                      {(
                        item.finalPrice || item.price * item.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>KSh {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{deliveryOptions[deliveryOption].label}</span>
                    <span>
                      {deliveryOptions[deliveryOption].price > 0
                        ? `KSh ${deliveryOptions[
                            deliveryOption
                          ].price.toLocaleString()}`
                        : t("free")}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>{t("total")}</span>
                  <span>KSh {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    className="mr-2 h-5 w-5"
                  />
                  <label htmlFor="terms-agreement" className="text-sm">
                    {t("termsAgreement")}
                  </label>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing || cart.length === 0}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : highContrast
                      ? "bg-yellow-300 text-black hover:bg-yellow-400"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isProcessing ? (
                    t("processing")
                  ) : (
                    <>
                      <FaLock className="mr-2" />
                      {t("completePurchase")}
                    </>
                  )}
                </button>

                <p className="text-xs mt-3 text-center">
                  {t("securePaymentNotice")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-lg ${
                highContrast
                  ? "bg-gray-900 border border-white"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h3 className="font-bold mb-3">{t("needHelp")}</h3>
              <p className="text-sm mb-3">{t("customerSupportInfo")}</p>
              <button
                className={`text-sm ${
                  highContrast
                    ? "text-yellow-300 hover:text-yellow-400"
                    : "text-indigo-600 hover:text-indigo-700"
                }`}
              >
                {t("contactSupport")}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
