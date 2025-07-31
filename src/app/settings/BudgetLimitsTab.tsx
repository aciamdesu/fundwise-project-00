"use client";

import { useState } from "react";
import AddBudgetModal from "../modals/AddBudgetModal";

type BudgetItem = {
  name: string;
  used: number;
  limit: number;
};

export default function BudgetLimitsTab() {
  const [budgetLimits, setBudgetLimits] = useState<BudgetItem[]>([
    { name: "Food", used: 50, limit: 500 },
  ]);

  return (
    <AddBudgetModal
      budgetLimits={budgetLimits}
      setBudgetLimits={setBudgetLimits}
    />
  );
}
