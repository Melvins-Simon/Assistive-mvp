import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";

export default function ProductCard({ product, highContrast }) {
  const { t } = useTranslation();

  const contrastClasses = highContrast
    ? "bg-black text-white border-2 border-white"
    : "bg-white shadow-md hover:shadow-lg";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-lg overflow-hidden transition-all ${contrastClasses}`}
      aria-labelledby={`product-${product.id}-title`}
    >
      <Link to={`/products/${product.id}`} className=" h-full flex flex-col">
        <div className="h-48 w-full flex items-center justify-center bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain p-4"
            style={{
              objectPosition: "center",
              mixBlendMode: highContrast ? "normal" : "multiply",
            }}
          />
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h2
            id={`product-${product.id}-title`}
            className={`text-xl font-semibold mb-2 ${
              highContrast ? "text-yellow-300" : "text-gray-800"
            }`}
          >
            {product.name}
          </h2>

          <p
            className={`mb-2 flex-grow ${
              highContrast ? "text-white" : "text-gray-600"
            }`}
          >
            {product.shortDescription}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span
              className={`text-lg font-bold ${
                highContrast ? "text-yellow-300" : "text-indigo-600"
              }`}
            >
              KSh {product.price.toLocaleString()}
            </span>
            <span
              className={`px-2 py-1 rounded text-sm ${
                highContrast
                  ? "bg-white text-black"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              {t(product.category)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
