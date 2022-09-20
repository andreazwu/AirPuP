import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoadAllSpots from './components/Spots/LoadAllSpots';
import LoadOneSpot from './components/Spots/LoadOneSpot';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

return (
  <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>

        <Route exact path='/'>
          <h1> Hello Yes I'm Still The Main Page... </h1>
          <LoadAllSpots />
        </Route>

        <Route path="/spots/:spotId">
          <h1> Load One Spot~ </h1>
          <LoadOneSpot />
        </Route>

        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    )}
  </>
);
}

export default App;
