import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../app/user-reducer';

function Welcome() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <p>
      Welcome
      {' '}
      {user?.fullName}
    </p>
  );
}

export default Welcome;
