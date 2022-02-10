import { useState, useEffect } from 'react';
import { signUp } from '../firebase-config';
import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';

const Register = () => {
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoadnig] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  const handleSignIn = () => {
    setLoadnig(true);
    signUp(email, password, displayName, (success, user) => {
      if (success) {
        setUser(user);
        router.push('/dashboard');
      }
    });
    setLoadnig(false);
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
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
      <button onClick={() => handleSignIn()}>sign in</button>
      {loading && 'loading....'}
    </div>
  );
};

export default Register;
