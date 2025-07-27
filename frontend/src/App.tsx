import { useEffect, useState } from "react";
import { fetchResources, fetchRecommendations } from "./api/api";
import type { Resource, RecommendationsResponse } from "./api/api";
import Summary from "./components/Summary";
import ResourcesTable from "./components/ResourcesTable";
import RecommendationsList from "./components/RecommendationsList";

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  const [implementedIds, setImplementedIds] = useState<number[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [resData, recData] = await Promise.all([fetchResources(), fetchRecommendations()]);
        setResources(resData);
        setRecommendations(recData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  
  const implementedSavings = recommendations
    ? recommendations.recommendations
        .filter((rec) => implementedIds.includes(rec.id))
        .reduce((sum, rec) => sum + rec.potential_saving, 0)
    : 0;

  const adjustedPotentialSavings = (recommendations?.total_potential_savings || 0) - implementedSavings;

  const totalMonthlyCost = resources.reduce((sum, r) => sum + r.monthly_cost, 0);
  const adjustedMonthlyCost = totalMonthlyCost - implementedSavings;

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

return (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-black text-white p-4 shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold max-w-7xl mx-auto">
        Cloud Optimization Dashboard
      </h1>
    </nav>

    <div className="sticky top-[64px] bg-white z-40 border-b shadow-sm">
      {summaryExpanded ? (
        <div>
          <Summary
            resources={resources}
            recommendations={recommendations}
            totalPotentialSavings={adjustedPotentialSavings}
            totalMonthlyCost={adjustedMonthlyCost}
            implementedCount={implementedIds.length}
          />
          <div className="text-center pb-2">
            <button
              onClick={() => setSummaryExpanded(false)}
              className="text-white cursor-pointer bg-orange-400 p-2"
            >
              Collapse Summary
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setSummaryExpanded(true)}
          className="cursor-pointer flex justify-around items-center px-4 py-2 bg-gray-50 text-sm"
        >
          <div>
            <span className="font-semibold">${adjustedMonthlyCost.toFixed(2)}</span>
            <span className="text-gray-500 ml-1">Monthly Cost</span>
          </div>
          <div>
            <span className="font-semibold text-green-600">
              ${adjustedPotentialSavings.toFixed(2)}
            </span>
            <span className="text-gray-500 ml-1">Potential Savings</span>
          </div>
          <div>
            <span className="font-semibold">{recommendations?.recommendations.length || 0}</span>
            <span className="text-gray-500 ml-1">Opportunities</span>
          </div>
          <span className="ml-2"><button className="text-white cursor-pointer bg-orange-400 p-2">Expand ▾</button></span>
        </div>
      )}
    </div>

    <div className="max-w-7xl mx-auto px-4 space-y-6 mt-6">
      <ResourcesTable resources={resources} />
      <RecommendationsList
        recommendations={recommendations}
        implementedIds={implementedIds}
        setImplementedIds={setImplementedIds}
      />
    </div>
  </div>
);

}

export default App;
