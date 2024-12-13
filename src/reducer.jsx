export const initialState = {
    expenses: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] };
        case 'REMOVE_EXPENSE':
            return { ...state, expenses: state.expenses.filter((_, index) => index !== action.payload) };
        default:
            return state;
    }
};
