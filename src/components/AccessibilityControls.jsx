import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { useTranslation } from "../hooks/useTranslation";

export default function AccessibilityControls() {
  const { t } = useTranslation();
  const { textSize, highContrast, updateTextSize, toggleContrast } =
    useContext(AccessibilityContext);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg">
      <div>
        <h3 className="font-semibold mb-2">{t("textSize")}</h3>
        <div className="flex space-x-2">
          {["small", "medium", "large", "xlarge"].map((size) => (
            <button
              key={size}
              onClick={() => updateTextSize(size)}
              className={`px-3 py-1 rounded ${
                textSize === size ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              aria-pressed={textSize === size}
            >
              {t(size)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">{t("highContrast")}</h3>
        <button
          onClick={toggleContrast}
          className={`px-4 py-2 rounded ${
            highContrast
              ? "bg-black text-white border-2 border-white"
              : "bg-gray-800 text-white"
          }`}
          aria-pressed={highContrast}
        >
          {highContrast ? t("highContrastOn") : t("highContrastOff")}
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">{t("screenReader")}</h3>
        <p className="text-sm text-gray-600">{t("screenReaderInstructions")}</p>
      </div>
    </div>
  );
}
