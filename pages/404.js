import { useAuthContext } from '../components/AuthContext';
import { useEffect } from 'react';

export default function Custom404() {
  const AuthContext = useAuthContext();
  const { setIs404 } = AuthContext;
  useEffect(() => {
    setIs404(true);
  }, []);
  return <h1>404 - Page Not Found</h1>;
}
