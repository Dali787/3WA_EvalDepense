import React, { useState, useContext } from 'react';
import { ExpenseContext } from './ExpenseProvider';
import { categories } from './constants';

const InputField = ({ label, type, value, onChange }) => (
    <div>
        <label>{label} :</label>
        <input type={type} value={value} onChange={onChange} />
    </div>
);

const Expenses = () => {
    const { state, dispatch } = useContext(ExpenseContext);
    const [label, setLabel] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories[0]);

    const { total, totalsByCategory } = React.useMemo(() => {
        const total = state.expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const totalsByCategory = state.expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        return { total, totalsByCategory };
    }, [state.expenses]);

    const handleAddExpense = () => {
        if (label.trim() && amount.trim()) {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: { label, amount: parseFloat(amount), category }
            });
            setLabel('');
            setAmount('');
        }
    };

    return (
        <div className="app-container">
            <h1>Gestionnaire de Dépenses</h1>

            <div className="form-container">
                <InputField
                    label="Label"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                <InputField
                    label="Montant (€)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <div>
                    <label>Catégorie :</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAddExpense}>Ajouter</button>
            </div>

            <hr />

            <h2>Liste des Dépenses</h2>
            <ul>
                {state.expenses.map((expense, index) => (
                    <li key={index} className="expense-item">
                        <strong>{expense.label}</strong>  {expense.amount}€ - {expense.category}
                        <button
                            onClick={() => dispatch({ type: 'REMOVE_EXPENSE', payload: index })}
                            className="button_delete"
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Total des Dépenses : {total}€</h2>
            <h3>Détail par Catégorie :</h3>
            <ul>
                {Object.entries(totalsByCategory).map(([cat, sum]) => (
                    <li key={cat}>
                        {cat} : {sum}€
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
