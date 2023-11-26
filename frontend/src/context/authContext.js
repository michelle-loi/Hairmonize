import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext()

// pass app components to context provider so users can be authenticated and be provided different types of access
export const AuthContextProvider = ({children}) =>{
    // check local storage to see if your cookie has been loaded (user logged in), if so user is logged in get that user if not set null
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))


    // create login function
    const login = async(inputs)=>{
        const response = await axios.post("/auth/login", inputs);
        // set user to the local data because we have logged in successfully
        setCurrentUser(response.data);
    }

    // creating a logout function
    const logout = async(inputs)=>{
        const response = await axios.post("/auth/logout", inputs);
        // this time set user to null because we are logging out
        setCurrentUser(null);
    }

    // update the local storage each time a different user logs in
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    // allow these functions and states to be used app wide
    return(
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};