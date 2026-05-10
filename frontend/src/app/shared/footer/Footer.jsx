import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return (
    <div className="profile-container">
      <h2>Mon Profil</h2>
      {user && <ProfileForm user={user} userId={userId} />}
    </div>
  );
}

export default Profile;