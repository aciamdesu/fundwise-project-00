"use client";

import { createContext, useContext, useState } from "react";

type BudgetLimit = {
  name: string;
  limit: number;
};

type UserSettingsContextType = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  
    showAddBudgetModal: boolean;
    setShowAddBudgetModal: (value: boolean) => void;
  
    showEditBudgetModal: boolean;
    setShowEditBudgetModal: (value: boolean) => void;
  
    showAddRecurringModal: boolean;
    setShowAddRecurringModal: (value: boolean) => void;
  
    showEditRecurringModal: boolean;
    setShowEditRecurringModal: (value: boolean) => void;
  
    showAddAccountModal: boolean;
    setShowAddAccountModal: (value: boolean) => void;
  
    showEditAccountModal: boolean;
    setShowEditAccountModal: (value: boolean) => void;
  
    showAddSavingsModal: boolean;
    setShowAddSavingsModal: (value: boolean) => void;
  
    showEditSavingsModal: boolean;
    setShowEditSavingsModal: (value: boolean) => void;
  
    budgetLimits: BudgetLimit[];
    setBudgetLimits: (limits: BudgetLimit[]) => void;
  };  

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState("profile");
  
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  
    const [showAddRecurringModal, setShowAddRecurringModal] = useState(false);
    const [showEditRecurringModal, setShowEditRecurringModal] = useState(false);
  
    const [showAddAccountModal, setShowAddAccountModal] = useState(false);
    const [showEditAccountModal, setShowEditAccountModal] = useState(false);
  
    const [showAddSavingsModal, setShowAddSavingsModal] = useState(false);
    const [showEditSavingsModal, setShowEditSavingsModal] = useState(false);
  
    const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
  
    return (
      <UserSettingsContext.Provider
        value={{
          activeTab,
          setActiveTab,
          budgetLimits,
          setBudgetLimits,
          showAddBudgetModal,
          setShowAddBudgetModal,
          showEditBudgetModal,
          setShowEditBudgetModal,
          showAddRecurringModal,
          setShowAddRecurringModal,
          showEditRecurringModal,
          setShowEditRecurringModal,
          showAddAccountModal,
          setShowAddAccountModal,
          showEditAccountModal,
          setShowEditAccountModal,
          showAddSavingsModal,
          setShowAddSavingsModal,
          showEditSavingsModal,
          setShowEditSavingsModal,
        }}
      >
        {children}
      </UserSettingsContext.Provider>
    );
  };  

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) throw new Error("useUserSettings must be used within UserSettingsProvider");
  return context;
};

