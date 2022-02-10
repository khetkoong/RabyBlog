import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from './AuthContext';
import { onAuthStateChanged, auth } from '../firebase-config';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const AuthContext = useAuthContext();
  const { setUser } = AuthContext;

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [];
    const path = url.split('?')[0];
    try {
      const unSub = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser && !publicPaths.includes(path)) {
          console.log('redirect login');
          router.push('/login');
        } else {
          setUser(currentUser);
        }
      });
      return unSub;
    } catch (error) {
      console.log('on Auth error: ', error);
    }
  }

  return children;
};

export default RouteGuard;
