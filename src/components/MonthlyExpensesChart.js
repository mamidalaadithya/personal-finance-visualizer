import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const MonthlyExpensesChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  const months = [...Array(6).keys()].map(i => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return format(date, 'MMM yyyy');
  }).reverse();

  const monthlyTotals = months.map(month => {
    const monthExpenses = expenses.filter(t =>
      format(new Date(t.date), 'MMM yyyy') === month
    );
    const total = monthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return total;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyTotals,
        fill: false,
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        tension: 0.4,
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
      <h2 className="chart-title">Monthly Expenses</h2>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
