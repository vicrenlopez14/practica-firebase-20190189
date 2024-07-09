import React, {createContext, useContext, useEffect, useState} from "react";
import {authentication} from "../config/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        authentication.onAuthStateChanged((user) => {
            if (user) {
                setLoggedInUser(user);
            } else {
                console.log('User not logged in');
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
