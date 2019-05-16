import React, { useState, useEffect } from 'react';
import { useFetchData } from '../utils/fetchData';
import User from './User';

const initialUrl = 'http://localhost:5000/api/users/';
const initialData = {
  data: [],
  page: 0,
  per_page: 0,
  total: 0,
  total_pages: 0,
};

export default () => {
  const [users, setUsers] = useState([]);	
  const { data, isLoading, isError, doFetch } = useFetchData(initialUrl, initialData);
  
  useEffect(() => {
    setUsers(currentState => [...currentState, ...data.data]);
  }, [data]);

  const handleClick = () => doFetch(`http://localhost:5000/api/users?page=${data.page + 1}`);

  return (
    <>	  
      {isError && <div>Something went wrong ...</div>}	  
      <ul>	  
        {users.map(user => 
          <li key={user.id}>
	    <User user={user} />
          </li>
        )}
      </ul>
      {isLoading && <div>Loading ...</div>}
      { users.length > 0 && data.page < data.total_pages &&	  
      	<button onClick={handleClick} disabled={isLoading}>
	  View More
        </button>
      }
    </>
  );
}
