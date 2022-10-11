import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoadAllSpots from './components/Spots/LoadAllSpots';
import LoadOneSpot from './components/Spots/LoadOneSpot';
import CreateSpot from './components/Spots/CreateSpot';
import EditSpot from './components/Spots/EditSpot';


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

        <Route exact path="/">
          <h1> Hello Yes I'm Still The Main Page... </h1>
          <LoadAllSpots />
        </Route>

        <Route path="/spots/:spotId">
          <h1> Load One Spot~ </h1>
          <LoadOneSpot />
        </Route>

        <Route path="/new">
          <h1> Create A New Spot!! </h1>
          <CreateSpot />
        </Route>

        <Route path="/edit/:spotId">
          <h1> Edit A Spot~ </h1>
          <EditSpot />
        </Route>

      </Switch>
    )}
  </>
);
}

export default App;
