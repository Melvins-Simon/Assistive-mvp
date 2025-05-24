import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaUniversalAccess,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Header() {
  const { t } = useTranslation();
  const { highContrast, toggleContrast } = useContext(AccessibilityContext);

  const contrastClasses = highContrast
    ? "bg-black text-white border-b border-white"
    : "bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm text-gray-800";

  const iconColor = highContrast ? "text-yellow-300" : "text-indigo-600";
  const hoverEffect = highContrast
    ? "hover:bg-white hover:text-black"
    : "hover:bg-indigo-100 hover:text-indigo-700";

  return (
    <header className={`sticky top-0 z-50 py-3 ${contrastClasses}`}>
      <div className="container mx-auto px-4">
        {/* Top Row - Utility Navigation */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleContrast}
              className={`p-2 rounded-full ${hoverEffect}`}
              aria-label="Toggle high contrast mode"
            >
              <FaUniversalAccess className={`text-lg ${iconColor}`} />
            </motion.button>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/donate"
              className={`flex items-center px-3 py-1 rounded-full ${hoverEffect}`}
            >
              <FaHeart className={`mr-2 ${iconColor}`} />
              <span className="hidden sm:inline">{t("donate")}</span>
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2">
          <motion.div whileHover={{ scale: 1.02 }} className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className={`mr-2 ${iconColor}`}>♿</span>
              <span>{t("appTitle")}</span>
            </Link>
          </motion.div>

          <nav className="flex items-center space-x-1 md:space-x-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/products"
                className={`px-3 py-2 rounded-lg flex items-center ${hoverEffect}`}
              >
                <FaSearch className="mr-2 md:hidden" />
                <span>{t("products")}</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/community"
                className={`px-3 py-2 rounded-lg ${hoverEffect}`}
              >
                {t("community")}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/seller"
                className={`px-3 py-2 rounded-lg ${hoverEffect}`}
              >
                {t("sellerDashboard")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/help"
                className={`px-3 py-2 rounded-lg ${hoverEffect}`}
              >
                {t("helpchat")}
              </Link>
            </motion.div>

            <div className="flex items-center space-x-2 md:space-x-4 ml-2 md:ml-6">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/cart"
                  className={`p-2 relative rounded-full `}
                  aria-label="Shopping cart"
                >
                  <FaShoppingCart className={`text-xl ${iconColor}`} />
                  <span className="absolute top-4 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/account"
                  className={`p-2 rounded-full `}
                  aria-label="User account"
                >
                  <FaUserCircle className={`text-xl ${iconColor}`} />
                </Link>
              </motion.div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
