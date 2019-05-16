import React, { useState, useEffect, useReducer } from 'react';

const dataFetchReducer = (state, {type, payload}) => {
  switch (type) {
    case 'FETCH_INIT':
      return {
        ...state,
	isLoading: true,
	isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
	isLoading: false,
	isError: false,
	data: payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
	isLoading: false,
	isError: true,
      };
    dafault:
      throw new Error();
  }
};

export const useFetchData = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: true,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const abortController = new AbortController();
                              
    (async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(url, {
	  signal: abortController.signal,
	});
	const data = await response.json();

	if (!didCancel) {
	  dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
	if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
 	}
      } 
    })();

    return () => {
      didCancel = true;
      abortController.abort();
    };
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  }; 

  return { ...state, doFetch };
};
