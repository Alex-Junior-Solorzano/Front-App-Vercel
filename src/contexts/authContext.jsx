import React ,{ createContext  } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    return(
        <AuthContext.Provider value={{ text: "hola" }} > 
            { children } 
        </AuthContext.Provider>
    )
}
//export {AuthProvider};
//export default AuthContext;