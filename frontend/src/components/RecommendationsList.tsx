import type { RecommendationsResponse } from "../api/api";

interface RecommendationsListProps {
  recommendations: RecommendationsResponse | null;
  implementedIds: number[];
  setImplementedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function RecommendationsList({
  recommendations,
  implementedIds,
  setImplementedIds,
}: RecommendationsListProps) {
  const toggleImplemented = (id: number) => {
    setImplementedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (!recommendations || recommendations.recommendations.length === 0) {
    return (
      <div className="bg-white p-4 shadow mt-4">
        <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
        <p className="text-gray-500">No optimization opportunities detected.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow mt-4">
      <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
      <ul>
        {recommendations.recommendations.map((rec) => (
          <li
            key={rec.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">
                {rec.name}: {rec.recommendation}
              </p>
              <p className="text-sm text-gray-500">
                Current: ${rec.current_cost.toFixed(2)} | Potential Saving:{" "}
                <span className="text-green-600">${rec.potential_saving.toFixed(2)}</span>
              </p>
              <p className="text-xs text-gray-400">Confidence: {rec.confidence}</p>
            </div>
            <button
              onClick={() => toggleImplemented(rec.id)}
              className={`px-3 py-1 ${
                implementedIds.includes(rec.id)
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-400 text-white"
              }`}
            >
              {implementedIds.includes(rec.id) ? "Implemented" : "Mark Implemented"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
