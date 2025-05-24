import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation();
  const { highContrast } = useContext(AccessibilityContext);

  const contrastClasses = highContrast
    ? "bg-black text-white border-t border-white"
    : "bg-gradient-to-br from-indigo-900 to-blue-800 text-white";

  const hoverEffect = highContrast
    ? "hover:text-yellow-300"
    : "hover:text-indigo-200";

  const socialIconClass = highContrast
    ? "text-white hover:text-yellow-300"
    : "text-white hover:text-indigo-200";

  return (
    <footer className={`py-12 ${contrastClasses}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaHeart className="mr-2" /> {t("aboutUs")}
            </h3>
            <p className="leading-relaxed">{t("aboutUsDescription")}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  className={`flex items-center ${hoverEffect}`}
                  whileHover={{ x: 5 }}
                >
                  <FaMapMarkerAlt className="mr-2" /> {t("privacyPolicy")}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`flex items-center ${hoverEffect}`}
                  whileHover={{ x: 5 }}
                >
                  <FaFileAlt className="mr-2" /> {t("termsOfService")}
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className={`flex items-center ${hoverEffect}`}
                  whileHover={{ x: 5 }}
                >
                  <FaPhone className="mr-2" /> {t("contactUs")}
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="mr-2" /> +254 700 123 456
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> info@assistivetech.org
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Nairobi, Kenya
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">{t("connectWithUs")}</h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className={`text-2xl ${socialIconClass}`}
                whileHover={{ y: -3 }}
                aria-label="Facebook"
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="#"
                className={`text-2xl ${socialIconClass}`}
                whileHover={{ y: -3 }}
                aria-label="Twitter"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className={`text-2xl ${socialIconClass}`}
                whileHover={{ y: -3 }}
                aria-label="Instagram"
              >
                <FaInstagram />
              </motion.a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">{t("newsletter")}</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("yourEmail")}
                  className="px-3 py-2 rounded-l-lg text-gray-200 w-full focus:ring-1 focus:ring-green-500 focus:outline-none"
                />
                <button
                  className={`px-4 py-2 rounded-r-lg ${
                    highContrast
                      ? "bg-yellow-300 text-black"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {t("subscribe")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-6 border-t border-white/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            &copy; {new Date().getFullYear()} {t("appTitle")}.{" "}
            {t("allRightsReserved")}
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <a href="#" className={hoverEffect}>
              {t("accessibility")}
            </a>
            <a href="#" className={hoverEffect}>
              {t("sitemap")}
            </a>
            <a href="#" className={hoverEffect}>
              {t("careers")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
