import React, { createContext, useEffect, useState } from 'react';
import { getIsAuth, signInUser } from '../api/auth';
import { useNotification } from '../hook';

export const AuthContext = createContext()

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ""
}

const AuthProvider = ({ children }) => {
    const { updateNotification } = useNotification()
    const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo })

    const handleLogin = async (email, password) => {
        setAuthInfo({ ...authInfo, inPending: true })
        const { error, user } = await signInUser({ email, password })
        if (error) {
            updateNotification("error", error)
            return setAuthInfo({ ...authInfo, isPending: false, error })
        }
        setAuthInfo(
            {
                profile: { ...user },
                isPending: false,
                isLoggedIn: true,
                error: ""
            }
        );

        localStorage.setItem("auth-token", user.token)

    }

    const isAuth = async () => {
        const token = localStorage.getItem("auth-token")
        if (!token) return;
        setAuthInfo({ ...authInfo, inPending: true })
        const { error, user } = await getIsAuth(token)
        if (error) {
            updateNotification("error", error)
            return setAuthInfo({ ...authInfo, isPending: false, error })
        }
        setAuthInfo(
            {
                profile: { ...user },
                isPending: false,
                isLoggedIn: true,
                error: ""
            }
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("auth-token")
        setAuthInfo({ ...defaultAuthInfo });
    }

    useEffect(() => {
        isAuth()
    }, [])

    //  handleLogout

    return (
        <AuthContext.Provider value={{ authInfo, handleLogin, isAuth, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;