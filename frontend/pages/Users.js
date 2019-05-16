import React from 'react';
import { Link } from 'react-router-dom';

import UsersList from '../components/UsersList';

export default () => {
  return (
    <div>
      <h1 className={'title'}>Users</h1>
      <UsersList />
    </div>
  );
};
