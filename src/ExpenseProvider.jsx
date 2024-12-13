import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ExpenseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    );
};
