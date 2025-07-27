export interface Resource {
  id: number;
  name: string;
  type: string;
  provider: string;
  instance_type?: string | null;
  size_gb?: number | null;
  cpu_util?: number | null;
  mem_util?: number | null;
  monthly_cost: number;
  created_at: string;
}

export interface Recommendation {
  id: number;
  name: string;
  recommendation: string;
  current_cost: number;
  potential_saving: number;
  confidence: "high" | "medium" | "low";
}

export interface RecommendationsResponse {
  total_potential_savings: number;
  recommendations: Recommendation[];
}

const API_BASE = "http://127.0.0.1:8000";

export async function fetchResources(): Promise<Resource[]> {
  const res = await fetch(`${API_BASE}/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function fetchRecommendations(): Promise<RecommendationsResponse> {
  const res = await fetch(`${API_BASE}/recommendations`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}
