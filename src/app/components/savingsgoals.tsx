"use client";

type Goal = {
  label: string;
  saved: number;
  target: number;
  daysLeft: number;
};

const goals: Goal[] = [
  {
    label: "Emergency Fund",
    saved: 2000,
    target: 5000,
    daysLeft: 359,
  },
];

export default function SavingsGoals() {
  return (
    <div className="bg-slate-800 rounded-xl p-4 space-y-4">
      {goals.map((goal, idx) => {
        const percent = Math.min((goal.saved / goal.target) * 100, 100);
        return (
          <div key={idx}>
            <div className="text-xs text-gray-300 mb-1">{goal.label}</div>
            <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              ${goal.saved} / ${goal.target} — {goal.daysLeft} days left to
              reach goal
            </div>
          </div>
        );
      })}
    </div>
  );
}
