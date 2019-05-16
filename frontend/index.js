import React, { Suspense, lazy } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './index.scss';

import Shell from './components/Shell';
const Users = lazy(() => import('./pages/Users'));
const Profile = lazy(() => import('./pages/Profile'));

const App = () => {
  return (
    <Router>	  
      <div className={'App'}>
	<Suspense fallback={<div>Loading ...</div>}>
          <Switch>
            <Route exact path={'/'} component={Shell(Users)} />
	    <Route exact path={'/users/:id'} component={Shell(Profile)} />
          </Switch>
	</Suspense>
      </div>
    </Router>
  );
};

render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
