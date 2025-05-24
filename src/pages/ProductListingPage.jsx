import { useState, useEffect, useContext } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { AccessibilityContext } from "../context/AccessibilityContext";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { products } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function ProductListingPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      results = results.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, categoryFilter]);

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-gradient-to-br from-indigo-900 to-blue-800 text-white";

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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
    <div className={`min-h-screen ${textSizes[textSize]} ${contrastClasses}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              highContrast ? "text-yellow-300" : "text-white"
            }`}
          >
            {t("productCatalog")}
          </h1>

          <div className="relative">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                highContrast
                  ? "bg-white text-black"
                  : "bg-indigo-700 text-white"
              }`}
              aria-label="Filter products"
            >
              <FaFilter />
            </button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-4 p-4 rounded-lg overflow-hidden ${
                  highContrast ? "bg-gray-900" : "bg-indigo-800"
                }`}
              >
                <label htmlFor="category-filter" className="block mb-2">
                  {t("filterByCategory")}
                </label>
                <select
                  id="category-filter"
                  className={`w-full p-2 rounded ${
                    highContrast
                      ? "bg-white text-black"
                      : "bg-white text-indigo-900"
                  }`}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">{t("allCategories")}</option>
                  <option value="mobility">{t("mobilityDevices")}</option>
                  <option value="hearing">{t("hearingAids")}</option>
                  <option value="vision">{t("visionAids")}</option>
                  <option value="daily-living">{t("dailyLivingAids")}</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-6 rounded-full bg-white/10 mb-4">
              <FaSearch className="text-4xl" />
            </div>
            <p className="text-xl">{t("noProductsFound")}</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
              className={`mt-4 px-4 py-2 rounded-lg ${
                highContrast
                  ? "bg-white text-black"
                  : "bg-white text-indigo-800"
              }`}
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={cardVariants} layout>
                  <ProductCard product={product} highContrast={highContrast} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
