import { useState } from 'react';
import { useRouter } from 'next/router';
import { updateProfileName } from '../firebase-config';
const Profile = ({ user }) => {
  const router = useRouter();
  const [profileName, setProfileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeName = async () => {
    setLoading(true);
    try {
      if (!!profileName) {
        const resUpdate = await updateProfileName(profileName);
        console.log('resUpdate: ', resUpdate);
        if (resUpdate) router.push('/dashboard');
      }
    } catch (error) {
      console.log('error updateProfileName: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      name:
      <input
        type="text"
        value={profileName}
        placeholder={user?.displayName}
        onChange={(e) => setProfileName(e.target.value)}
      />
      <button disabled={loading} onClick={() => handleChangeName()}>
        {loading ? 'loading...' : 'confirm'}
      </button>
    </>
  );
};

export default Profile;
