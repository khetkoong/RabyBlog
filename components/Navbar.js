import { useAuthContext } from './AuthContext';

const Navbar = ({ children }) => {
  const AuthContext = useAuthContext();
  const { user, is404 } = AuthContext;
  if (!user || is404) return children;
  return (
    <>
      this is nav bar
      {children}
    </>
  );
};

export default Navbar;
