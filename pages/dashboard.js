import { signOut } from '../firebase-config';
import { useAuthContext } from '../components/AuthContext';

const Dashboard = () => {
  const AuthContext = useAuthContext();
  const { user, setUser } = AuthContext;

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
      <br />
      dashboard <button onClick={() => handleSignOut()}>logout</button>
      <br />
      email: {user?.email}
      <br />
      name: {user?.displayName}
    </>
  );
};

export default Dashboard;
