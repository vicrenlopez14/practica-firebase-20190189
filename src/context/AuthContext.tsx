import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
