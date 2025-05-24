import { useState, useContext } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { AccessibilityContext } from "../context/AccessibilityContext";
import {
  FaHandHoldingHeart,
  FaBoxOpen,
  FaShoppingCart,
  FaLeaf,
  FaUsers,
  FaWheelchair,
  FaDeaf,
  FaBlind,
  FaPersonBooth,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import DonationProgress from "../components/DonationProgress";
import ImpactStories from "../components/ImpactStories";

export default function DonationsPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [activeTab, setActiveTab] = useState("money");
  const [donationAmount, setDonationAmount] = useState(500);
  const [equipmentType, setEquipmentType] = useState("wheelchair");
  const [wishlistItem, setWishlistItem] = useState(null);
  const [donorName, setDonorName] = useState("");
  const [donorMessage, setDonorMessage] = useState("");

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

  const tabClasses = (tabName) =>
    activeTab === tabName
      ? highContrast
        ? "border-yellow-300 text-yellow-300"
        : "border-indigo-600 text-indigo-600"
      : highContrast
      ? "border-transparent hover:text-yellow-300"
      : "border-transparent hover:text-indigo-600";

  const equipmentTypes = [
    { id: "wheelchair", name: t("wheelchair"), icon: <FaWheelchair /> },
    { id: "cane", name: t("whiteCane"), icon: <FaBlind /> },
    { id: "hearingAid", name: t("hearingAid"), icon: <FaDeaf /> },
    { id: "prosthetic", name: t("prostheticLimb"), icon: <FaPersonBooth /> },
    { id: "other", name: t("otherEquipment"), icon: <FaBoxOpen /> },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: t("schoolKit"),
      description: t("schoolKitDesc"),
      price: 1500,
      needed: 23,
      donated: 8,
      image: "/images/school-kit.jpg",
    },
    {
      id: 2,
      name: t("medicalKit"),
      description: t("medicalKitDesc"),
      price: 3500,
      needed: 15,
      donated: 3,
      image: "/images/medical-kit.jpg",
    },
    {
      id: 3,
      name: t("hygieneKit"),
      description: t("hygieneKitDesc"),
      price: 800,
      needed: 42,
      donated: 19,
      image: "/images/hygiene-kit.jpg",
    },
  ];

  const handleDonate = () => {
    // In a real app, this would process the donation
    alert(t("donationThankYou"));
  };

  return (
    <div
      className={`min-h-screen py-12 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">{t("makeAnImpact")}</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t("donationHeroText")}
          </p>
          <DonationProgress
            raised={1250000}
            goal={3000000}
            highContrast={highContrast}
          />
        </motion.div>

        {/* Donation Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap justify-center -mb-px">
              {[
                {
                  id: "money",
                  icon: <FaHandHoldingHeart className="mr-2" />,
                  text: t("donateMoney"),
                },
                {
                  id: "equipment",
                  icon: <FaBoxOpen className="mr-2" />,
                  text: t("donateEquipment"),
                },
                {
                  id: "wishlist",
                  icon: <FaShoppingCart className="mr-2" />,
                  text: t("buyForOthers"),
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-lg ${tabClasses(
                    tab.id
                  )}`}
                >
                  {tab.icon}
                  {tab.text}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {/* Money Donation */}
            {activeTab === "money" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 gap-12"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("monetaryDonation")}
                  </h2>
                  <p className="mb-6">{t("moneyDonationDesc")}</p>

                  <div className="mb-8">
                    <h3 className="font-bold mb-4">{t("suggestedAmounts")}</h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[500, 1000, 2000, 5000, 10000, 20000].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setDonationAmount(amount)}
                          className={`py-3 rounded-lg font-medium ${
                            donationAmount === amount
                              ? highContrast
                                ? "bg-yellow-300 text-black"
                                : "bg-indigo-600 text-white"
                              : highContrast
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          KSh {amount.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="customAmount"
                        className="block mb-2 font-medium"
                      >
                        {t("customAmount")}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          KSh
                        </span>
                        <input
                          type="number"
                          id="customAmount"
                          value={donationAmount}
                          onChange={(e) =>
                            setDonationAmount(parseInt(e.target.value) || 0)
                          }
                          className={`w-full pl-12 p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">{t("donorDetails")}</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="donorName" className="block mb-2">
                          {t("yourName")} ({t("optional")})
                        </label>
                        <input
                          type="text"
                          id="donorName"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className={`w-full p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                          placeholder={t("namePlaceholder")}
                        />
                      </div>
                      <div>
                        <label htmlFor="donorMessage" className="block mb-2">
                          {t("message")} ({t("optional")})
                        </label>
                        <textarea
                          id="donorMessage"
                          value={donorMessage}
                          onChange={(e) => setDonorMessage(e.target.value)}
                          rows="3"
                          className={`w-full p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                          placeholder={t("messagePlaceholder")}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDonate}
                    className={`w-full py-4 rounded-lg font-bold text-lg ${buttonClasses}`}
                  >
                    {t("donateNow")} KSh {donationAmount.toLocaleString()}
                  </button>
                </div>

                <div
                  className={`p-8 rounded-lg ${
                    highContrast ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-4">
                    {t("whatYourDonationDoes")}
                  </h3>
                  <div className="space-y-6">
                    <div className="flex">
                      <div
                        className={`p-3 rounded-full mr-4 ${
                          highContrast
                            ? "bg-yellow-300 text-black"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        <FaWheelchair className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">
                          {t("provideMobility")}
                        </h4>
                        <p className="text-sm">{t("mobilityImpact")}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className={`p-3 rounded-full mr-4 ${
                          highContrast
                            ? "bg-yellow-300 text-black"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        <FaLeaf className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">
                          {t("supportEducation")}
                        </h4>
                        <p className="text-sm">{t("educationImpact")}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className={`p-3 rounded-full mr-4 ${
                          highContrast
                            ? "bg-yellow-300 text-black"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        <FaUsers className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">
                          {t("empowerCommunity")}
                        </h4>
                        <p className="text-sm">{t("communityImpact")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Equipment Donation */}
            {activeTab === "equipment" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 gap-12"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("equipmentDonation")}
                  </h2>
                  <p className="mb-6">{t("equipmentDonationDesc")}</p>

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">{t("equipmentType")}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {equipmentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setEquipmentType(type.id)}
                          className={`flex flex-col items-center p-4 rounded-lg ${
                            equipmentType === type.id
                              ? highContrast
                                ? "bg-yellow-300 text-black"
                                : "bg-indigo-600 text-white"
                              : highContrast
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          <span className="text-2xl mb-2">{type.icon}</span>
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">
                      {t("equipmentCondition")}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { id: "new", label: t("newCondition") },
                        { id: "usedGood", label: t("usedGoodCondition") },
                        { id: "usedFair", label: t("usedFairCondition") },
                        { id: "needsRepair", label: t("needsRepair") },
                      ].map((condition) => (
                        <div key={condition.id} className="flex items-center">
                          <input
                            type="radio"
                            id={condition.id}
                            name="condition"
                            className="mr-2"
                          />
                          <label htmlFor={condition.id}>
                            {condition.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold mb-4">{t("donorDetails")}</h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="equipmentDonorName"
                          className="block mb-2"
                        >
                          {t("yourName")}
                        </label>
                        <input
                          type="text"
                          id="equipmentDonorName"
                          className={`w-full p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                          placeholder={t("namePlaceholder")}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="equipmentDonorContact"
                          className="block mb-2"
                        >
                          {t("contactInfo")}
                        </label>
                        <input
                          type="text"
                          id="equipmentDonorContact"
                          className={`w-full p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                          placeholder={t("phoneOrEmail")}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="equipmentDescription"
                          className="block mb-2"
                        >
                          {t("equipmentDescription")} ({t("optional")})
                        </label>
                        <textarea
                          id="equipmentDescription"
                          rows="3"
                          className={`w-full p-3 border rounded-lg ${
                            highContrast
                              ? "bg-white text-black"
                              : "bg-white text-gray-800"
                          }`}
                          placeholder={t("describeEquipment")}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDonate}
                    className={`w-full py-4 rounded-lg font-bold text-lg ${buttonClasses}`}
                  >
                    {t("submitDonationOffer")}
                  </button>
                </div>

                <div
                  className={`p-8 rounded-lg ${
                    highContrast ? "bg-gray-900" : "bg-gray-50"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-4">
                    {t("equipmentDonationProcess")}
                  </h3>
                  <ol className="space-y-6">
                    {[
                      { icon: "1", text: t("submitDonationForm") },
                      { icon: "2", text: t("receiveConfirmation") },
                      { icon: "3", text: t("schedulePickupOrDropoff") },
                      { icon: "4", text: t("receiveTaxReceipt") },
                    ].map((step) => (
                      <li key={step.icon} className="flex">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                            highContrast
                              ? "bg-yellow-300 text-black"
                              : "bg-indigo-100 text-indigo-800"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <p>{step.text}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8">
                    <h4 className="font-bold mb-2">{t("currentlyNeeded")}</h4>
                    <ul className="space-y-2">
                      {[
                        t("wheelchairs"),
                        t("hearingAids"),
                        t("walkers"),
                        t("brailleWriters"),
                      ].map((item) => (
                        <li key={item} className="flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${
                              highContrast ? "bg-yellow-300" : "bg-indigo-600"
                            }`}
                          ></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Wishlist Donation */}
            {activeTab === "wishlist" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold mb-6">
                  {t("purchaseForOthers")}
                </h2>
                <p className="mb-8 max-w-3xl">{t("wishlistDonationDesc")}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {wishlistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5 }}
                      className={`border rounded-lg overflow-hidden ${
                        highContrast ? "border-gray-600" : "border-gray-200"
                      }`}
                    >
                      <div className="h-48 bg-gray-200 relative">
                        {/* Item image would go here */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                          <h3 className="font-bold">{item.name}</h3>
                          <p>KSh {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="mb-4 text-sm">{item.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>
                              {t("needed")}: {item.needed}
                            </span>
                            <span>
                              {t("donated")}: {item.donated}
                            </span>
                          </div>
                          <div
                            className={`h-2 rounded-full ${
                              highContrast ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`h-full rounded-full ${
                                highContrast ? "bg-yellow-300" : "bg-indigo-600"
                              }`}
                              style={{
                                width: `${(item.donated / item.needed) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <button
                          onClick={() => setWishlistItem(item)}
                          className={`w-full py-2 rounded-lg ${
                            highContrast
                              ? "bg-yellow-300 text-black hover:bg-yellow-400"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                        >
                          {t("purchaseThisItem")}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {wishlistItem && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-6 rounded-lg ${
                      highContrast ? "bg-gray-900" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{wishlistItem.name}</h3>
                      <button
                        onClick={() => setWishlistItem(null)}
                        className={`p-1 rounded-full ${
                          highContrast
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-4">{wishlistItem.description}</p>
                        <div className="mb-6">
                          <h4 className="font-bold mb-2">{t("impact")}</h4>
                          <p>{t("itemImpactDescription")}</p>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="wishlistDonorName"
                            className="block mb-2"
                          >
                            {t("yourName")} ({t("optional")})
                          </label>
                          <input
                            type="text"
                            id="wishlistDonorName"
                            className={`w-full p-3 border rounded-lg ${
                              highContrast
                                ? "bg-white text-black"
                                : "bg-white text-gray-800"
                            }`}
                            placeholder={t("namePlaceholder")}
                          />
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="wishlistDonorMessage"
                            className="block mb-2"
                          >
                            {t("messageForRecipient")} ({t("optional")})
                          </label>
                          <textarea
                            id="wishlistDonorMessage"
                            rows="3"
                            className={`w-full p-3 border rounded-lg ${
                              highContrast
                                ? "bg-white text-black"
                                : "bg-white text-gray-800"
                            }`}
                            placeholder={t("encouragingMessage")}
                          ></textarea>
                        </div>
                      </div>

                      <div>
                        <div
                          className={`p-4 rounded-lg mb-6 ${
                            highContrast
                              ? "bg-gray-800"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <h4 className="font-bold mb-2">
                            {t("orderSummary")}
                          </h4>
                          <div className="flex justify-between mb-2">
                            <span>{wishlistItem.name}</span>
                            <span>
                              KSh {wishlistItem.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>{t("delivery")}</span>
                            <span>{t("free")}</span>
                          </div>
                          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                            <span>{t("total")}</span>
                            <span>
                              KSh {wishlistItem.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleDonate}
                          className={`w-full py-4 rounded-lg font-bold text-lg ${buttonClasses}`}
                        >
                          {t("completePurchaseFor")} {wishlistItem.name}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Impact Stories */}
        <ImpactStories highContrast={highContrast} />

        {/* Tax Benefits Section */}
        <div
          className={`mt-16 p-8 rounded-lg ${
            highContrast ? "bg-gray-900" : "bg-indigo-50"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">{t("taxBenefits")}</h2>
          <p className="mb-4">{t("taxBenefitsDescription")}</p>
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              highContrast
                ? "bg-yellow-300 text-black hover:bg-yellow-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {t("learnMoreAboutTaxDeductions")}
          </button>
        </div>
      </div>
    </div>
  );
}
