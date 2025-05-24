export default function DonationProgress({ raised, goal, highContrast }) {
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-bold">KSh {raised.toLocaleString()}</span>
        <span>Goal: KSh {goal.toLocaleString()}</span>
      </div>
      <div
        className={`h-4 rounded-full overflow-hidden ${
          highContrast ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className={`h-full rounded-full ${
            highContrast ? "bg-yellow-300" : "bg-indigo-600"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
