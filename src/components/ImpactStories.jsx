import { FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";

export default function ImpactStories({ highContrast }) {
  const { t } = useTranslation();
  const stories = [
    {
      quote:
        "Thanks to a donated wheelchair, I can now attend school regularly",
      author: "Jamila, 12",
    },
    {
      quote:
        "The hearing aids changed my life - I can hear my grandchildren now",
      author: "Mzee Wambua, 68",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-center">{t("ourImpact")}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {stories.map((story, index) => (
          <div
            key={index}
            className={`p-8 rounded-lg ${
              highContrast ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <FaQuoteLeft
              className={`text-3xl mb-4 ${
                highContrast ? "text-yellow-300" : "text-indigo-600"
              }`}
            />
            <p className="text-lg italic mb-4">"{story.quote}"</p>
            <p className="font-medium">— {story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
