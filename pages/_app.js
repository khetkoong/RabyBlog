import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import AuthContext from '../components/AuthContext';
import Navbar from '../components/Navbar';
import RouteGuard from '../components/RouteGuard';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [m, setM] = useState(false);
  const [is404, setIs404] = useState(false);
  const authData = { setUser, user, setIs404, is404 };

  useEffect(() => {
    setM(true);
  }, []);

  return (
    <>
      {m && (
        <AuthContext.Provider value={authData}>
          <RouteGuard>
            <Navbar>
              <Component user={user} {...pageProps} />
            </Navbar>
          </RouteGuard>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default MyApp;
