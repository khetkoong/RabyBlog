import { useState } from 'react';
import { updateProfileName } from '../firebase-config';
const Profile = ({ user }) => {
  const [profileName, setProfileName] = useState('');
  return (
    <>
      name:
      <input
        type="text"
        value={profileName}
        placeholder={user?.displayName}
        onChange={(e) => setProfileName(e.target.value)}
      />
      <button onClick={() => !!profileName && updateProfileName(profileName)}>
        confirm
      </button>
    </>
  );
};

export default Profile;
