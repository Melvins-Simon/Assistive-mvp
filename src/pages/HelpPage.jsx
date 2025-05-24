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

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-white text-gray-800";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-indigo-600 text-white hover:bg-indigo-700";

  const secondaryButtonClasses = highContrast
    ? "bg-gray-800 text-white hover:bg-gray-700"
    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";

  const chatBubbleClasses = (sender) =>
    highContrast
      ? sender === "user"
        ? "bg-yellow-300 text-black"
        : "bg-gray-700 text-white"
      : sender === "user"
      ? "bg-indigo-100"
      : "bg-indigo-600 text-white";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          handleSendMessage(transcript); // Auto-send the transcribed message
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };
      }
    }

    // Initial demo messages
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your assistive chat helper. How can I assist you today?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: 2,
        text: "You can type or use voice input to communicate with me.",
        sender: "assistant",
        timestamp: new Date(Date.now() - 30000),
      },
    ]);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Always scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (messageContent = inputText) => {
    const content = messageContent.trim();
    if (!content) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate assistant reply
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        text: getDummyReply(content),
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the reply
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(assistantMessage.text);
        speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const toggleVoiceInput = () => {
    if (inputMode === "voice") {
      setInputMode("text");
      if (isListening) stopListening();
    } else {
      setInputMode("voice");
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getDummyReply = (message) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return "Hello there! How can I help you today?";
    } else if (lowerMsg.includes("help")) {
      return "I'm here to assist you. Could you tell me more about what you need help with?";
    } else if (lowerMsg.includes("product")) {
      return "We have various assistive products available. Would you like me to show you some options?";
    } else if (lowerMsg.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I understand. Our support team will get back to you shortly with more information.";
    }
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default form submission behavior
      handleSendMessage();
    }
  };

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">{t("assistiveChat")}</h1>
          <p className="text-lg">{t("chatDescription")}</p>
        </motion.div>

        <div
          className={`rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col ${
            highContrast ? "border border-white" : "border border-gray-200"
          }`}
        >
          {/* Chat Header */}
          <div
            className={`p-4 flex items-center ${
              highContrast ? "bg-gray-900" : "bg-indigo-600 text-white"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                highContrast
                  ? "bg-yellow-300 text-black"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              <FaRobot className="text-xl" />
            </div>
            <div>
              <h2 className="font-bold">{t("assistiveAssistant")}</h2>
              <p className="text-sm">
                {isListening ? t("listening") : t("online")}
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className={`flex-1 overflow-y-auto p-4 ${
              highContrast ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg p-4 ${chatBubbleClasses(
                      message.sender
                    )}`}
                  >
                    <div className="flex items-start">
                      {message.sender === "assistant" && (
                        <div
                          className={`mr-2 mt-1 ${
                            highContrast ? "text-yellow-300" : "text-indigo-100"
                          }`}
                        >
                          <FaRobot />
                        </div>
                      )}
                      <div className="flex-1">
                        <p>{message.text}</p>
                        <div
                          className={`text-xs mt-1 flex items-center ${
                            message.sender === "user"
                              ? highContrast
                                ? "text-gray-800"
                                : "text-gray-500"
                              : highContrast
                              ? "text-yellow-200"
                              : "text-indigo-100"
                          }`}
                        >
                          {message.sender === "assistant" && (
                            <button
                              onClick={() => speakMessage(message.text)}
                              className="mr-2"
                              aria-label="Read message aloud"
                            >
                              <FaVolumeUp />
                            </button>
                          )}
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <div
                          className={`ml-2 mt-1 ${
                            highContrast ? "text-yellow-300" : "text-indigo-600"
                          }`}
                        >
                          <FaUser />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
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

            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown} // Changed from onKeyUp to onKeyDown
                className={`flex-1 p-3 border rounded-l-lg ${
                  highContrast ? "bg-white text-black" : "bg-white"
                } ${isListening ? "border-indigo-300 bg-indigo-50" : ""}`}
                placeholder={
                  inputMode === "text"
                    ? t("typeMessagePlaceholder")
                    : t("voiceResultPlaceholder")
                }
                disabled={inputMode === "voice" && isListening}
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
                  onClick={() => handleSendMessage()}
                  disabled={inputText.trim() === "" || isListening}
                  className={`px-4 py-3 rounded-r-lg flex items-center ${buttonClasses} ${
                    inputText.trim() === "" || isListening
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
