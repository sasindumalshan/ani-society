import  { createContext, useState, ReactNode, useContext } from 'react';

interface AuthState {
    username: string;
    token: string;
}

interface AuthContextProps {
    auth: AuthState;
    login: (username: string, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({
        username: '',
        token: ''
    });

    const login = (username: string, token: string) => {
        setAuth({ username, token });
        localStorage.setItem('auth', JSON.stringify({ username, token }));
    };

    const logout = () => {
        setAuth({ username: '', token: '' });
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
