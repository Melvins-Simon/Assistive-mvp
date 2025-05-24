import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../assets/translations";

export function useTranslation() {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t };
}
