import { createContext, useState, useEffect } from "react";

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [textSize, setTextSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedTextSize = localStorage.getItem("textSize");
    const savedContrast = localStorage.getItem("highContrast");

    if (savedTextSize) setTextSize(savedTextSize);
    if (savedContrast === "true") setHighContrast(true);
  }, []);

  const updateTextSize = (size) => {
    setTextSize(size);
    localStorage.setItem("textSize", size);
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    localStorage.setItem("highContrast", !highContrast);
  };

  return (
    <AccessibilityContext.Provider
      value={{ textSize, highContrast, updateTextSize, toggleContrast }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
