// src/App.js
import React, { useState } from 'react';
import { AddTransactionForm } from './components/AddTransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthlyExpensesChart } from './components/MonthlyExpensesChart';
import { CategoryPieChart } from './components/CategoryPieChart';
import { BudgetForm } from './components/BudgetForm';
import { BudgetComparisonChart } from './components/BudgetComparisonChart';
import { Dashboard } from './components/Dashboard';
import { mockTransactions, mockBudgets } from './data/mockData';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [budgets, setBudgets] = useState(mockBudgets);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addBudget = (budget) => {
    const existingIndex = budgets.findIndex(
      b => b.category === budget.category && b.month === budget.month
    );
    
    if (existingIndex >= 0) {
      const updatedBudgets = [...budgets];
      updatedBudgets[existingIndex] = budget;
      setBudgets(updatedBudgets);
    } else {
      setBudgets([...budgets, budget]);
    }
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Personal Finance Dashboard</h1>
          <p className="app-subtitle">Track your income, expenses, and budgets in one place</p>
        </header>
        
        <Dashboard transactions={transactions} budgets={budgets} />
        
        <div className="app-grid">
          <div className="app-sidebar">
            <AddTransactionForm onAddTransaction={addTransaction} />
            <BudgetForm budgets={budgets} onAddBudget={addBudget} />
          </div>
          
          <div className="app-main">
            <MonthlyExpensesChart transactions={transactions} />
            <div className="app-grid-2col">
              <CategoryPieChart transactions={transactions} />
              <BudgetComparisonChart budgets={budgets} transactions={transactions} />
            </div>
          </div>
        </div>
        
        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}

export default App;