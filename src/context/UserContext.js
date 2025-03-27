'use client'

const { createContext, useContext, useState, useEffect } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    const signUp = (userData) => {
        try {
            const existingUser = localStorage.getItem(userData.email);
            if (existingUser) {
                return ({ success: false, error: 'User already exists' })
            }
            localStorage.setItem(userData.email, JSON.stringify(userData));

            localStorage.setItem("loggedInUser", JSON.stringify(userData));

            return { success: true, message: "User signed up successfully" };
        } catch (error) {
            console.error(error.message);
            return ({ success: false, error: 'Signup failed' })
        }
    }

    const login = (userData) => {
        setLoading(true)
        try {
            const user = localStorage.getItem(userData.email);
            // console.log("User:", user);

            if (!user) {
                return ({ success: false, error: 'User not found' })
            }

            const parsedUser = JSON.parse(user);
            if (parsedUser.password !== userData.password) {
                return ({ success: false, error: 'Incorrect password' })
            }

            localStorage.setItem("loggedInUser", JSON.stringify(parsedUser))
            setUser(parsedUser);

            return { success: true, message: "Login successful" };
        } catch (error) {
            console.log(error.message);
            return ({ success: false, error: 'Login failed' })
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setLoading(true)
        try {
            localStorage.removeItem("loggedInUser");
            setUser(null);
            return { success: true, message: "Logout successfully" };
        } catch (error) {
            return ({ success: false, error: 'Logout failed' })
        } finally {
            setLoading(false)
        }
    }

    const deleteAccount = (currentUserEmail) => {
        setLoading(true);
        try {
            localStorage.removeItem(currentUserEmail);

            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser?.email === currentUserEmail) {
                localStorage.removeItem("loggedInUser");
                setUser(null);
            }
            return ({ success: true, message: "Account deleted successfully" })
        } catch (error) {
            return ({ success: false, error: 'Failed to delete account' })
        } finally {
            setLoading(false)
        }
    }
    return (
        <UserContext.Provider value={{ signUp, login, logout, user, loading, deleteAccount }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);