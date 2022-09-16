import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <>
    <Switch>

      <Route exact path='/'>
        <h1> Hello Yes I'm Still The Main Page... </h1>
      </Route>

      <Route path="/login">
        <LoginFormPage />
      </Route>

    </Switch>
    </>
  );
}

export default App;
