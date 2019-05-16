import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchData } from '../utils/fetchData';

const endpoint = 'http://localhost:5000/api/users/';
const initialData = {
  data: {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  }
};

export default ({match}) => {	
  const { data, isLoading, isError, doFetch } = useFetchData(
    `${endpoint}${match.params.id}`, 
    initialData
  );
  
  const { email, first_name, last_name, avatar } = data.data;
  return (
    <div>
      <Link className={'back'} to={'/'} >{'<back'}</Link>
      <div className="card">
	<img src={avatar} style={{width:'100%'}} />
	<h1>{first_name} {last_name}</h1>
	<p className="card-email">{email}</p>
      </div>
    </div>
  );
};
