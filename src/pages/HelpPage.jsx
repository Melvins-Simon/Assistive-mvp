import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaMicrophone,
  FaPaperPlane,
  FaVolumeUp,
  FaUser,
  FaRobot,
  FaKeyboard,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AssistiveChatPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState("text");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // ... (keep other existing code the same until the return statement)

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ... (keep header section the same) */}

        <div
          className={`rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col ${
            highContrast ? "border border-white" : "border border-gray-200"
          }`}
        >
          {/* ... (keep chat header the same) */}

          {/* ... (keep chat messages section the same) */}

          {/* Input Area - Modified section */}
          <div className={`p-4 ${highContrast ? "bg-gray-900" : "bg-white"}`}>
            {inputMode === "voice" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`mb-4 p-3 rounded-lg flex items-center justify-center ${
                  highContrast ? "bg-gray-800" : "bg-indigo-50"
                }`}
              >
                {isListening ? (
                  <>
                    <div className="animate-pulse mr-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <p className="mr-3">{t("speakNow")}</p>
                    <button
                      onClick={stopListening}
                      className={`px-4 py-2 rounded-full ${buttonClasses}`}
                    >
                      {t("stopListening")}
                    </button>
                  </>
                ) : (
                  <>
                    <FaMicrophone
                      className={`mr-3 ${
                        highContrast ? "text-yellow-300" : "text-indigo-600"
                      }`}
                    />
                    <button
                      onClick={startListening}
                      className={`px-4 py-2 rounded-full ${buttonClasses}`}
                    >
                      {t("startSpeaking")}
                    </button>
                  </>
                )}
              </motion.div>
            )}

            {/* Always show the text input, even in voice mode */}
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
                className={`flex-1 p-3 border rounded-l-lg ${
                  highContrast ? "bg-white text-black" : "bg-white"
                } ${isListening ? "border-indigo-300 bg-indigo-50" : ""}`}
                placeholder={
                  inputMode === "text"
                    ? t("typeMessagePlaceholder")
                    : t("voiceResultPlaceholder")
                }
                aria-live={inputMode === "voice" ? "polite" : "off"}
              />

              <div className="flex">
                <button
                  onClick={toggleVoiceInput}
                  className={`px-3 border-t border-b flex items-center ${
                    highContrast
                      ? "bg-gray-800 hover:bg-gray-700 border-white"
                      : "bg-indigo-50 hover:bg-indigo-100 border-gray-300"
                  } ${
                    inputMode === "voice"
                      ? highContrast
                        ? "bg-yellow-300 text-black"
                        : "bg-indigo-600 text-white"
                      : ""
                  }`}
                  aria-label={
                    inputMode === "text"
                      ? "Switch to voice input"
                      : "Switch to text input"
                  }
                >
                  {inputMode === "text" ? <FaMicrophone /> : <FaKeyboard />}
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={inputText.trim() === ""}
                  className={`px-4 py-3 rounded-r-lg flex items-center ${buttonClasses} ${
                    inputText.trim() === ""
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>

            <div className="mt-2 text-center">
              <p className="text-sm">
                {inputMode === "text"
                  ? t("pressEnterToSend")
                  : t("clickMicToSpeak")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
