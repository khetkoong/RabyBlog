import { createContext, useContext } from 'react';

const AuthContext = createContext();
export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
