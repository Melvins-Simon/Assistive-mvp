import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { VoiceRecognitionContext } from "../context/VoiceRecognitionContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMicrophone, FaStopCircle } from "react-icons/fa";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();
  const { isListening, voiceCommand, startListening, stopListening } =
    useContext(VoiceRecognitionContext);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (voiceCommand) {
      setLocalSearchTerm(voiceCommand);
      setSearchTerm(voiceCommand);
    }
  }, [voiceCommand, setSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setLocalSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl mx-auto shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex-grow">
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
          ${isFocused ? "text-indigo-500" : "text-gray-400"}`}
        >
          <FaSearch />
        </div>
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t("searchProducts")}
          className={`w-full pl-10 pr-16 py-4 border-0 rounded-l-lg text-black focus:outline-none text-lg ${
            isListening ? "bg-indigo-50" : "bg-white"
          }`}
          aria-label={t("searchProducts")}
        />

        <AnimatePresence>
          {localSearchTerm && (
            <motion.button
              type="button"
              onClick={() => setLocalSearchTerm("")}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Clear search"
            >
              ×
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
            isListening
              ? "bg-red-500 text-white animate-pulse shadow-lg"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          aria-label={isListening ? t("stopListening") : t("startListening")}
        >
          {isListening ? (
            <FaStopCircle className="text-xl" />
          ) : (
            <FaMicrophone className="text-xl" />
          )}
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={isListening}
        whileHover={!isListening ? { scale: 1.02 } : {}}
        whileTap={!isListening ? { scale: 0.98 } : {}}
        className={`px-6 py-4 rounded-r-lg text-lg font-medium ${
          isListening
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
        }`}
      >
        {isListening ? (
          <span className="flex items-center">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {t("listening")}...
            </motion.span>
          </span>
        ) : (
          t("search")
        )}
      </motion.button>
    </motion.form>
  );
}
