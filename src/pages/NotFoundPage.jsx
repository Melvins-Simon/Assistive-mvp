import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-gradient-to-r from-green-700 to-blue-800 text-white";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">{t("pageNotFound")}</h2>
        <p className="text-xl mb-8">{t("pageNotFoundMessage")}</p>
        <Link
          to="/"
          className={`inline-block px-6 py-3 rounded-lg font-semibold ${
            highContrast
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-white text-green-800 hover:bg-gray-100"
          }`}
        >
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
