import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthContext } from '../components/AuthContext';
import { signIn, auth } from '../firebase-config';

export default function LoginPage() {
  const router = useRouter();
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const { user } = await signIn(email, password);
      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      console.log('error signIn: ', error?.message);
      setError(error?.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin()}>login</button>
      <br />
      <button onClick={() => router.push('/register')}>register</button>
      {!!error && error}
    </div>
  );
}
