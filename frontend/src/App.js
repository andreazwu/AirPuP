import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LoadAllSpots from "./components/Spots/LoadAllSpots";
import LoadUserSpots from "./components/Spots/LoadUserSpots";
import LoadOneSpot from "./components/Spots/LoadOneSpot";
import CreateSpot from "./components/Spots/CreateSpot";
import EditSpot from "./components/Spots/EditSpot";
import LoadUserReviews from "./components/Reviews/LoadUserReviews";
import PageNotFound from "./components/PageNotFound";

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
          <LoadAllSpots />
        </Route>

        <Route exact path="/newspot">
          <CreateSpot />
        </Route>

        <Route exact path="/myspots">
          <LoadUserSpots />
        </Route>

        <Route path="/myspots/edit/:spotId">
          <EditSpot />
        </Route>

        <Route exact path="/myreviews">
          <h1> App: These are my reviews~~ </h1>
          <LoadUserReviews />
        </Route>

        <Route path="/spots/:spotId">
          <LoadOneSpot />
        </Route>

        <Route>
          <PageNotFound />
        </Route>

      </Switch>
    )}
  </>
);
}

export default App;
