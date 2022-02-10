import { useAuthContext } from './AuthContext';
import { useRouter } from 'next/router';
import { signOut } from '../firebase-config';

const Navbar = ({ children }) => {
  const AuthContext = useAuthContext();
  const { user, is404, setUser } = AuthContext;
  const router = useRouter();
  if (!user || is404) return children;

  const handleSignOut = async () => {
    signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log('sign out error : ', error);
      });
  };

  return (
    <>
      <button onClick={() => router.push('/dashboard')}>dashboard</button> |{' '}
      <button onClick={() => router.push('/profile')}>profile</button> |
      <button onClick={() => handleSignOut()}>logout</button>
      <br />
      <br />
      {children}
    </>
  );
};

export default Navbar;
