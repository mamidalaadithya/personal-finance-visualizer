import React from 'react';
import { format } from 'date-fns';

export const Dashboard = ({ transactions, budgets }) => {
  const currentMonth = format(new Date(), 'yyyy-MM');
  const monthTransactions = transactions.filter(t => format(new Date(t.date), 'yyyy-MM') === currentMonth);

  const totalIncome = monthTransactions.filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions.filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netSavings = totalIncome - totalExpenses;

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card income">
        <h3>Income</h3>
        <p>${totalIncome.toFixed(2)}</p>
      </div>
      <div className="dashboard-card expenses">
        <h3>Expenses</h3>
        <p>${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="dashboard-card savings">
        <h3>Net Savings</h3>
        <p>${netSavings.toFixed(2)}</p>
      </div>
    </div>
  );
};
