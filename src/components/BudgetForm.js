// src/components/BudgetForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '../data/constants';

export const BudgetForm = ({ budgets, onAddBudget }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const budget = {
      id: Date.now().toString(),
      category: data.category,
      amount: Number(data.amount),
      month: data.month
    };
    onAddBudget(budget);
    reset();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Set Budget</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div className="form-control">
            <label className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              {...register('amount', { required: 'Amount is required' })}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>

          <div className="form-control">
            <label className="form-label">Month</label>
            <input
              type="month"
              className="form-input"
              {...register('month', { required: 'Month is required' })}
            />
            {errors.month && <p className="mt-1 text-sm text-red-600">{errors.month.message}</p>}
          </div>

          <div className="mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Set Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};