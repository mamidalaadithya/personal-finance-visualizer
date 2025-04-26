import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { categories } from '../data/constants';

export const AddTransactionForm = ({ onAddTransaction }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [type, setType] = useState('expense');

  const onSubmit = (data) => {
    const transaction = {
      id: Date.now().toString(),
      amount: type === 'expense' ? -Math.abs(Number(data.amount)) : Math.abs(Number(data.amount)),
      date: new Date(data.date),
      description: data.description,
      category: type === 'expense' ? data.category : 'Income',
      type
    };
    onAddTransaction(transaction);
    reset();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Add Transaction</h2>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                className="form-input"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />
              <span style={{ color: '#4b5563' }}>Expense</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                className="form-input"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />
              <span style={{ color: '#4b5563' }}>Income</span>
            </label>
          </div>

          <div className="form-control">
            <label className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              {...register('amount', { required: 'Amount is required' })}
            />
            {errors.amount && <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.amount.message}</p>}
          </div>

          <div className="form-control">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.date.message}</p>}
          </div>

          <div className="form-control">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.description.message}</p>}
          </div>

          {type === 'expense' && (
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
              {errors.category && <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#dc2626' }}>{errors.category.message}</p>}
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
