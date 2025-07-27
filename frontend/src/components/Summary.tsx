import type { Resource, RecommendationsResponse } from "../api/api";

interface SummaryProps {
  resources: Resource[];
  recommendations: RecommendationsResponse | null;
  totalPotentialSavings: number;
  totalMonthlyCost: number;
  implementedCount: number;
}

export default function Summary({
  resources,
  recommendations,
  totalPotentialSavings,
  totalMonthlyCost,
  implementedCount,
}: SummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 my-6">
      <div className="border border-gray-300 p-4 text-center">
        <p className="text-gray-500 text-sm">Resources</p>
        <h2 className="text-2xl font-bold">{resources.length}</h2>
      </div>
      <div className="border border-gray-300 p-4 text-center">
        <p className="text-gray-500 text-sm">Monthly Cost</p>
        <h2 className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</h2>
      </div>
      <div className="border border-gray-300 p-4 text-center">
        <p className="text-gray-500 text-sm">Potential Savings</p>
        <h2 className="text-2xl font-bold text-green-600">${totalPotentialSavings.toFixed(2)}</h2>
      </div>
      <div className="border border-gray-300 p-4 text-center">
        <p className="text-gray-500 text-sm">Opportunities</p>
        <h2 className="text-2xl font-bold">{recommendations?.recommendations.length || 0}</h2>
      </div>
      <div className="border border-gray-300 p-4 text-center">
        <p className="text-gray-500 text-sm">Implemented</p>
        <h2 className="text-2xl font-bold">{implementedCount}</h2>
      </div>
    </div>
  );
}
