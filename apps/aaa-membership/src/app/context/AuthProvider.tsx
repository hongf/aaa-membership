import { createContext, useContext, useState } from 'react';

interface IAuthContext {
  auth: any;
  setAuth: (auth: any) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContextProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
};

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useRE must be used within a REContextProvider');
  }
  return context;
}

export { AuthContext, AuthContextProvider, useAuthContext };
