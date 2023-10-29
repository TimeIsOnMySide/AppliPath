import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        // check for user in local storage
        const user = JSON.parse(localStorage.getItem('user'));

        // If a user exists in local storage, update the user state to be logged in
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    // console.log('AuthContext State: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
