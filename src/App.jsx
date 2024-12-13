import React from 'react';
import { ExpenseProvider } from './ExpenseProvider';
import Expenses from './Expenses';
import './style.css';


const App = () => {
    return (
        <ExpenseProvider>
            <Expenses />
        </ExpenseProvider>
    );
};


export default App;
