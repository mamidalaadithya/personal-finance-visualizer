// src/data/mockData.js
import { subMonths, format } from 'date-fns';
import { categories } from './constants';

const generateMockTransactions = () => {
  const transactions = [];
  
  for (let i = 0; i < 50; i++) {
    const isExpense = Math.random() > 0.3;
    const category = isExpense ? categories[Math.floor(Math.random() * categories.length)] : 'Income';
    
    transactions.push({
      id: `t${i}`,
      amount: isExpense 
        ? -(Math.floor(Math.random() * 500) + 50)
        : Math.floor(Math.random() * 3000) + 2000,
      date: subMonths(new Date(), Math.floor(Math.random() * 6)),
      description: isExpense 
        ? `Payment for ${category.toLowerCase()}`
        : 'Salary deposit',
      category,
      type: isExpense ? 'expense' : 'income'
    });
  }
  
  return transactions;
};

const generateMockBudgets = () => {
  return [
    { id: 'b1', category: 'Food', amount: 800, month: format(new Date(), 'yyyy-MM') },
    { id: 'b2', category: 'Rent', amount: 1200, month: format(new Date(), 'yyyy-MM') },
    { id: 'b3', category: 'Utilities', amount: 300, month: format(new Date(), 'yyyy-MM') },
    { id: 'b4', category: 'Transportation', amount: 200, month: format(new Date(), 'yyyy-MM') },
    { id: 'b5', category: 'Entertainment', amount: 150, month: format(new Date(), 'yyyy-MM') },
  ];
};

export const mockTransactions = generateMockTransactions();
export const mockBudgets = generateMockBudgets();