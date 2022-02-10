import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/dist/client/router';

const Dashboard = () => {
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;
  const router = useRouter();

  return (
    <>
      dashboard
      <br />
      email: {user?.email}
      <br />
      name: {user?.displayName || '-'}
    </>
  );
};

export default Dashboard;
