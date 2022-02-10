import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import AuthContext from '../components/AuthContext';
import Navbar from '../components/Navbar';
import RouteGuard from '../components/RouteGuard';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [mainLoading, setMainLoading] = useState(false);
  const [m, setM] = useState(false);
  const [is404, setIs404] = useState(false);

  const authData = { setUser, user, setIs404, is404 };

  useEffect(() => {
    setM(true);
  }, []);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setMainLoading(true);
  //   };
  //   const handleStop = () => {
  //     setMainLoading(false);
  //   };
  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleStop);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleStop);
  //   };
  // }, [router]);

  return (
    <>
      {m && (
        <AuthContext.Provider value={authData}>
          {mainLoading ? (
            <>loading...</>
          ) : (
            <RouteGuard>
              <Navbar>
                <Component user={user} {...pageProps} />
              </Navbar>
            </RouteGuard>
          )}
        </AuthContext.Provider>
      )}
    </>
  );
}

export default MyApp;
