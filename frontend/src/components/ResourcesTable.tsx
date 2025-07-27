import type { Resource } from "../api/api";

interface ResourcesTableProps {
  resources: Resource[];
}

export default function ResourcesTable({ resources }: ResourcesTableProps) {
  return (
    <div className="p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Cloud Resources</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Provider</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">CPU Util</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Mem Util</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Storage (GB)</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr
                key={res.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-900 font-medium">{res.name}</td>
                <td className="py-3 px-4 text-gray-700 capitalize">{res.type}</td>
                <td className="py-3 px-4 text-gray-700">{res.provider}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    res.cpu_util != null && res.cpu_util < 30 ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {res.cpu_util != null ? `${res.cpu_util}%` : "-"}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    res.mem_util != null && res.mem_util < 50 ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {res.mem_util != null ? `${res.mem_util}%` : "-"}
                </td>
                <td className="py-3 px-4 text-gray-700">{res.size_gb ?? "-"}</td>
                <td className="py-3 px-4 font-semibold text-gray-900">${res.monthly_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
