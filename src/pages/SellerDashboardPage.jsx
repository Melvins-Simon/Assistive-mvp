import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChartLine,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function SellerDashboardPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "mobility",
    price: "",
    description: "",
    specifications: {
      weight: "",
      dimensions: "",
      color: "",
    },
  });
  const [activeTab, setActiveTab] = useState("products");

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

  const tabClasses = (tabName) =>
    activeTab === tabName
      ? highContrast
        ? "border-yellow-300 text-yellow-300"
        : "border-indigo-600 text-indigo-600"
      : highContrast
      ? "border-transparent hover:text-yellow-300"
      : "border-transparent hover:text-indigo-600";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      image: "/images/placeholder-product.jpg",
      dateAdded: new Date().toISOString(),
      status: "active",
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: "",
      category: "mobility",
      price: "",
      description: "",
      specifications: {
        weight: "",
        dimensions: "",
        color: "",
      },
    });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64">
            <div
              className={`p-6 rounded-lg sticky top-6 ${
                highContrast ? "bg-gray-900" : "bg-indigo-50"
              }`}
            >
              <h1 className="text-2xl font-bold mb-8 flex items-center">
                <FaBoxOpen className="mr-2" /> {t("sellerDashboard")}
              </h1>

              <nav className="space-y-2">
                {[
                  {
                    id: "products",
                    icon: <FaBoxOpen />,
                    text: t("yourProducts"),
                  },
                  {
                    id: "analytics",
                    icon: <FaChartLine />,
                    text: t("analytics"),
                  },
                  {
                    id: "earnings",
                    icon: <FaMoneyBillWave />,
                    text: t("earnings"),
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? highContrast
                          ? "bg-yellow-300 text-black"
                          : "bg-indigo-600 text-white"
                        : highContrast
                        ? "hover:bg-gray-800"
                        : "hover:bg-indigo-100"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.text}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "products" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  <div
                    className={`p-6 rounded-lg ${
                      highContrast ? "bg-gray-900" : "bg-indigo-50"
                    }`}
                  >
                    <h3 className="font-bold mb-2">{t("totalProducts")}</h3>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div
                    className={`p-6 rounded-lg ${
                      highContrast ? "bg-gray-900" : "bg-indigo-50"
                    }`}
                  >
                    <h3 className="font-bold mb-2">{t("activeListings")}</h3>
                    <p className="text-3xl font-bold">8</p>
                  </div>
                  <div
                    className={`p-6 rounded-lg ${
                      highContrast ? "bg-gray-900" : "bg-indigo-50"
                    }`}
                  >
                    <h3 className="font-bold mb-2">{t("pendingApproval")}</h3>
                    <p className="text-3xl font-bold">2</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div
                    className={`p-6 rounded-lg ${
                      highContrast
                        ? "bg-gray-900 border border-white"
                        : "bg-white shadow-md"
                    }`}
                  >
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <FaPlus className="mr-2" /> {t("addNewProduct")}
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block mb-2 font-medium"
                        >
                          {t("productName")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg ${
                            highContrast ? "bg-white text-black" : "bg-white"
                          }`}
                          required
                          placeholder={t("productNamePlaceholder")}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block mb-2 font-medium"
                        >
                          {t("category")}
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg ${
                            highContrast ? "bg-white text-black" : "bg-white"
                          }`}
                          required
                        >
                          <option value="mobility">
                            {t("mobilityDevices")}
                          </option>
                          <option value="hearing">{t("hearingAids")}</option>
                          <option value="vision">{t("visionAids")}</option>
                          <option value="daily-living">
                            {t("dailyLivingAids")}
                          </option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="price"
                          className="block mb-2 font-medium"
                        >
                          {t("price")} (KSh)
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg ${
                            highContrast ? "bg-white text-black" : "bg-white"
                          }`}
                          required
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block mb-2 font-medium"
                        >
                          {t("description")}
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-lg ${
                            highContrast ? "bg-white text-black" : "bg-white"
                          }`}
                          rows="4"
                          required
                          placeholder={t("descriptionPlaceholder")}
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-medium mb-2">
                          {t("specifications")}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="weight"
                              className="block text-sm mb-1"
                            >
                              {t("weight")}
                            </label>
                            <input
                              type="text"
                              id="weight"
                              name="weight"
                              value={formData.specifications.weight}
                              onChange={handleSpecChange}
                              className={`w-full p-2 border rounded ${
                                highContrast
                                  ? "bg-white text-black"
                                  : "bg-white"
                              }`}
                              placeholder="e.g. 2.5kg"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="dimensions"
                              className="block text-sm mb-1"
                            >
                              {t("dimensions")}
                            </label>
                            <input
                              type="text"
                              id="dimensions"
                              name="dimensions"
                              value={formData.specifications.dimensions}
                              onChange={handleSpecChange}
                              className={`w-full p-2 border rounded ${
                                highContrast
                                  ? "bg-white text-black"
                                  : "bg-white"
                              }`}
                              placeholder="e.g. 20x30x15cm"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="color"
                              className="block text-sm mb-1"
                            >
                              {t("color")}
                            </label>
                            <input
                              type="text"
                              id="color"
                              name="color"
                              value={formData.specifications.color}
                              onChange={handleSpecChange}
                              className={`w-full p-2 border rounded ${
                                highContrast
                                  ? "bg-white text-black"
                                  : "bg-white"
                              }`}
                              placeholder="e.g. Blue"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${buttonClasses}`}
                      >
                        <FaPlus className="mr-2" /> {t("addProduct")}
                      </motion.button>
                    </form>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {t("yourProducts")}
                    </h2>
                    {products.length === 0 ? (
                      <div
                        className={`p-8 text-center rounded-lg ${
                          highContrast ? "bg-gray-900" : "bg-indigo-50"
                        }`}
                      >
                        <p>{t("noProductsAdded")}</p>
                        <button
                          onClick={() =>
                            document.getElementById("name").focus()
                          }
                          className={`mt-4 px-4 py-2 rounded-lg ${secondaryButtonClasses}`}
                        >
                          {t("addYourFirstProduct")}
                        </button>
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {products.map((product) => (
                          <motion.li
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 rounded-lg ${
                              highContrast
                                ? "bg-gray-900 border border-white"
                                : "bg-white shadow-sm"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">
                                  {product.name}
                                </h3>
                                <p
                                  className={`text-sm ${
                                    highContrast
                                      ? "text-yellow-300"
                                      : "text-indigo-600"
                                  }`}
                                >
                                  KSh {product.price.toLocaleString()}
                                </p>
                                <p className="text-sm mt-1">
                                  {product.description.substring(0, 60)}...
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  className={`p-2 rounded-full ${
                                    highContrast
                                      ? "bg-gray-800 hover:bg-gray-700"
                                      : "bg-indigo-100 hover:bg-indigo-200"
                                  }`}
                                  aria-label={t("editProduct")}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => deleteProduct(product.id)}
                                  className={`p-2 rounded-full ${
                                    highContrast
                                      ? "bg-gray-800 hover:bg-gray-700"
                                      : "bg-red-100 hover:bg-red-200 text-red-600"
                                  }`}
                                  aria-label={t("deleteProduct")}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t flex justify-between text-xs">
                              <span>
                                {t("added")}:{" "}
                                {new Date(
                                  product.dateAdded
                                ).toLocaleDateString()}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full ${
                                  product.status === "active"
                                    ? highContrast
                                      ? "bg-green-900 text-green-300"
                                      : "bg-green-100 text-green-800"
                                    : highContrast
                                    ? "bg-yellow-900 text-yellow-300"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {t(product.status)}
                              </span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-lg ${
                  highContrast ? "bg-gray-900" : "bg-white shadow-md"
                }`}
              >
                <h2 className="text-2xl font-bold mb-6">{t("analytics")}</h2>
                <div
                  className={`p-8 text-center rounded-lg ${
                    highContrast ? "bg-gray-800" : "bg-indigo-50"
                  }`}
                >
                  <p>{t("analyticsComingSoon")}</p>
                </div>
              </motion.div>
            )}

            {activeTab === "earnings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-lg ${
                  highContrast ? "bg-gray-900" : "bg-white shadow-md"
                }`}
              >
                <h2 className="text-2xl font-bold mb-6">{t("earnings")}</h2>
                <div
                  className={`p-8 text-center rounded-lg ${
                    highContrast ? "bg-gray-800" : "bg-indigo-50"
                  }`}
                >
                  <p>{t("earningsComingSoon")}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
