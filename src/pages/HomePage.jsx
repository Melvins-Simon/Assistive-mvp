import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const navigate = useNavigate();

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-gradient-to-r from-blue-800 to-indigo-900";

  const blobVariants = {
    initial: {
      x: 0,
      y: 0,
      rotate: 0,
    },
    animate: {
      x: [0, 20, 0],
      y: [0, 30, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${textSizes[textSize]} ${contrastClasses}`}
    >
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-30"
          variants={blobVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-20"
          variants={blobVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "5s" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-300 rounded-full filter blur-3xl opacity-20"
          variants={blobVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "10s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            {t("welcomeToATMarketplace")}
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto text-indigo-100"
            variants={itemVariants}
          >
            {t("homeMissionStatement")}
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <Link
              to="/products"
              className={`px-6 py-3 font-semibold rounded-lg transition ${
                highContrast
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-white text-indigo-800 hover:bg-indigo-100"
              }`}
            >
              {t("browseProducts")}
            </Link>
            <Link
              to="/login"
              className={`px-6 py-3 font-semibold rounded-lg transition ${
                highContrast
                  ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
                  : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-800"
              }`}
            >
              {t("login")}
            </Link>
          </motion.div>
        </motion.div>

        <motion.section
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={`p-6 rounded-lg ${
              highContrast
                ? "bg-white/10 backdrop-blur-sm"
                : "bg-white/10 backdrop-blur-sm text-white"
            }`}
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">{t("wideSelection")}</h2>
            <p>{t("wideSelectionDesc")}</p>
          </motion.div>
          <motion.div
            className={`p-6 rounded-lg ${
              highContrast
                ? "bg-white/10 backdrop-blur-sm"
                : "bg-white/10 backdrop-blur-sm text-white"
            }`}
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">
              {t("affordableOptions")}
            </h2>
            <p>{t("affordableOptionsDesc")}</p>
          </motion.div>
          <motion.div
            className={`p-6 rounded-lg ${
              highContrast
                ? "bg-white/10 backdrop-blur-sm"
                : "bg-white/10 backdrop-blur-sm text-white"
            }`}
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">{t("communitySupport")}</h2>
            <p>{t("communitySupportDesc")}</p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
