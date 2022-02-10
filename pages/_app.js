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
  const [is404, setIs404] = useState(false);
  const authData = { setUser, user, setMainLoading, setIs404, is404 };

  return (
    <>
      <AuthContext.Provider value={authData}>
        {mainLoading ? (
          'loading...'
        ) : (
          <RouteGuard>
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
          </RouteGuard>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;
