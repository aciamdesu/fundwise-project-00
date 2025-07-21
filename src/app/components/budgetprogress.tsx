"use client";

type BudgetItem = {
  category: string;
  spent: number;
  limit: number;
};

const budgetData: BudgetItem[] = [
  { category: "Food", spent: 200, limit: 500 },
  { category: "Entertainment", spent: 0, limit: 200 },
];

export default function BudgetProgress() {
  return (
    <div className="bg-slate-800 rounded-xl mt-4 space-y-4">
      {budgetData.map((item, idx) => {
        const percent = Math.min((item.spent / item.limit) * 100, 100);
        return (
          <div key={idx}>
            <div className="text-sm text-gray-300 mb-1">{item.category}</div>
            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ${item.spent} / ${item.limit}
            </div>
          </div>
        );
      })}
    </div>
  );
}
