import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const BudgetComparisonChart = ({ budgets, transactions }) => {
  const currentMonth = format(new Date(), 'yyyy-MM');
  const expenses = transactions.filter(t => t.type === 'expense' && format(new Date(t.date), 'yyyy-MM') === currentMonth);

  const expenseByCategory = {};
  expenses.forEach(t => {
    expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Math.abs(t.amount);
  });

  const data = {
    labels: budgets.map(b => b.category),
    datasets: [
      {
        label: 'Budget',
        data: budgets.map(b => b.amount),
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Actual',
        data: budgets.map(b => expenseByCategory[b.category] || 0),
        backgroundColor: '#ef4444',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="chart-card">
      <h2 className="chart-title">Budget vs Actual Spending</h2>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
