import React from 'react';
import { Link } from 'react-router-dom';

export default ({user}) => 
  <Link to={`/users/${user.id}`}>
    <div className={'user'}>
      <img className={'user-avatar'} src={user.avatar} />
      <div className={'user-info'}>
        <h1>{user.first_name} {user.last_name}</h1>
      </div>
    </div> 
  </Link>
