import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from './AuthContext';
import { onAuthStateChanged, auth } from '../firebase-config';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    const unsub = authCheck(router.asPath);
    return () => {
      unsub;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    setLoading(true);
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [];
    const path = url.split('?')[0];
    try {
      const unSub = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser && !publicPaths.includes(path)) {
          router.push('/login');
        } else {
          setUser(currentUser);
        }
      });
      return unSub;
    } catch (error) {
      console.log('on Auth error: ', error);
    } finally {
      setLoading(false);
    }
  }
  if (loading && !user) return 'loading...';

  return children;
};

export default RouteGuard;
