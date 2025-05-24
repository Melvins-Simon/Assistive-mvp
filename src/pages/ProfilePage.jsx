import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaHeart,
  FaShoppingCart,
  FaHistory,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    bio: "Assistive technology enthusiast and accessibility advocate",
    avatar:
      "https://imgs.search.brave.com/0-8cW9pH-AbL4tWpxd3hP0tMrbPqd3vU3VTG0vtNHf4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vdWFhZ3E5/S21jZ3U4N0NuYklt/bUZOOE5HaDBwYlo2/ckFoUGtMMTVIOXNt/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelV5THpBekx6/YzIvTHpNMk1GOUdY/ek0xTWpBei9Oelkz/TTE5aGNXdFZSVXcw/L1dIUXpNVlExYkcw/NVRHWTEvYkZGT00w/ZHVWRmhCVFhsRi9i/aTVxY0dj.jpeg",
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-05-15",
      total: 12500,
      status: "Delivered",
      items: ["Adjustable Wheelchair"],
    },
    {
      id: 2,
      date: "2023-04-28",
      total: 3500,
      status: "Processing",
      items: ["Tactile Walking Stick"],
    },
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Portable Braille Display", price: 28900 },
    { id: 2, name: "Smart Hearing Aid", price: 18700 },
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

  const textGradient = highContrast
    ? "text-yellow-300"
    : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    highContrast ? "bg-gray-800" : "bg-indigo-50"
                  }`}
                >
                  <FaUser className="text-4xl text-indigo-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md">
                <FaEdit className="text-indigo-600" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className={`text-2xl font-bold ${
                    highContrast ? "bg-white text-black" : "bg-white"
                  } border-b`}
                />
              ) : (
                <h1 className={`text-2xl font-bold ${textGradient}`}>
                  {userData.name}
                </h1>
              )}
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-4 py-2 rounded-full flex items-center ${secondaryButtonClasses}`}
              >
                <FaEdit className="mr-2" />
                {isEditing ? t("save") : t("editProfile")}
              </button>
            </div>

            {isEditing ? (
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                className={`w-full p-2 mb-3 ${
                  highContrast ? "bg-white text-black" : "bg-white"
                } border rounded`}
                rows="2"
              />
            ) : (
              <p className="text-gray-600 mb-4">{userData.bio}</p>
            )}

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <FaEnvelope
                  className={`mr-2 ${
                    highContrast ? "text-yellow-300" : "text-indigo-600"
                  }`}
                />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className={`${
                      highContrast ? "bg-white text-black" : "bg-white"
                    } border-b`}
                  />
                ) : (
                  <span>{userData.email}</span>
                )}
              </div>
              <div className="flex items-center">
                <FaPhone
                  className={`mr-2 ${
                    highContrast ? "text-yellow-300" : "text-indigo-600"
                  }`}
                />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className={`${
                      highContrast ? "bg-white text-black" : "bg-white"
                    } border-b`}
                  />
                ) : (
                  <span>{userData.phone}</span>
                )}
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className={`mr-2 ${
                    highContrast ? "text-yellow-300" : "text-indigo-600"
                  }`}
                />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className={`${
                      highContrast ? "bg-white text-black" : "bg-white"
                    } border-b`}
                  />
                ) : (
                  <span>{userData.location}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-b border-gray-200 mb-8"
        >
          <nav className="flex space-x-8">
            {[
              { id: "profile", icon: <FaUser />, text: t("profile") },
              { id: "orders", icon: <FaHistory />, text: t("orders") },
              { id: "wishlist", icon: <FaHeart />, text: t("wishlist") },
              { id: "security", icon: <FaLock />, text: t("security") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium flex items-center ${
                  activeTab === tab.id
                    ? highContrast
                      ? "border-yellow-300 text-yellow-300"
                      : "border-indigo-600 text-indigo-600"
                    : highContrast
                    ? "border-transparent hover:text-yellow-300"
                    : "border-transparent hover:text-indigo-600"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.text}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={activeTab}
        >
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`p-6 rounded-lg ${
                  highContrast ? "bg-gray-900" : "bg-indigo-50"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">{t("aboutMe")}</h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded ${
                      highContrast ? "bg-white text-black" : "bg-white"
                    }`}
                    rows="4"
                  />
                ) : (
                  <p>{userData.bio}</p>
                )}
              </div>

              <div
                className={`p-6 rounded-lg ${
                  highContrast ? "bg-gray-900" : "bg-indigo-50"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">
                  {t("accessibilitySettings")}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{t("highContrastMode")}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t("textSize")}</span>
                    <select
                      className={`p-2 rounded ${
                        highContrast ? "bg-white text-black" : "bg-white"
                      }`}
                    >
                      <option>{t("small")}</option>
                      <option>{t("medium")}</option>
                      <option>{t("large")}</option>
                      <option>{t("xlarge")}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div
                  className={`p-8 text-center rounded-lg ${
                    highContrast ? "bg-gray-900" : "bg-indigo-50"
                  }`}
                >
                  <p className="mb-4">{t("noOrders")}</p>
                  <button className={`px-4 py-2 rounded ${buttonClasses}`}>
                    {t("browseProducts")}
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-6 rounded-lg ${
                      highContrast
                        ? "bg-gray-900 border border-white"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className="font-semibold mr-4">
                          KSh {order.total.toLocaleString()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "Delivered"
                              ? highContrast
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-800"
                              : highContrast
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t flex justify-end">
                      <button
                        className={`px-4 py-2 rounded ${secondaryButtonClasses}`}
                      >
                        {t("viewDetails")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="grid md:grid-cols-2 gap-4">
              {wishlist.length === 0 ? (
                <div
                  className={`col-span-2 p-8 text-center rounded-lg ${
                    highContrast ? "bg-gray-900" : "bg-indigo-50"
                  }`}
                >
                  <p className="mb-4">{t("wishlistEmpty")}</p>
                  <button className={`px-4 py-2 rounded ${buttonClasses}`}>
                    {t("browseProducts")}
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg ${
                      highContrast
                        ? "bg-gray-900 border border-white"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <span
                        className={`font-semibold ${
                          highContrast ? "text-yellow-300" : "text-indigo-600"
                        }`}
                      >
                        KSh {item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-end mt-3 space-x-2">
                      <button
                        className={`px-3 py-1 rounded ${secondaryButtonClasses}`}
                      >
                        {t("addToCart")}
                      </button>
                      <button
                        className={`px-3 py-1 rounded ${
                          highContrast
                            ? "bg-red-900 text-white hover:bg-red-800"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div
              className={`p-6 rounded-lg ${
                highContrast ? "bg-gray-900" : "bg-indigo-50"
              }`}
            >
              <h2 className="text-xl font-bold mb-6">
                {t("securitySettings")}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">{t("changePassword")}</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder={t("currentPassword")}
                      className={`w-full p-3 rounded ${
                        highContrast ? "bg-white text-black" : "bg-white"
                      }`}
                    />
                    <input
                      type="password"
                      placeholder={t("newPassword")}
                      className={`w-full p-3 rounded ${
                        highContrast ? "bg-white text-black" : "bg-white"
                      }`}
                    />
                    <input
                      type="password"
                      placeholder={t("confirmPassword")}
                      className={`w-full p-3 rounded ${
                        highContrast ? "bg-white text-black" : "bg-white"
                      }`}
                    />
                  </div>
                  <button className={`mt-4 px-4 py-2 rounded ${buttonClasses}`}>
                    {t("updatePassword")}
                  </button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">{t("twoFactorAuth")}</h3>
                  <div className="flex items-center justify-between">
                    <p>{t("twoFactorDescription")}</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
