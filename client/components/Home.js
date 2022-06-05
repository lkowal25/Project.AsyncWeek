import React, { createContext } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import RestaurantsLandingPage from './RestaurantsLandingPage';
import SingleRestaurant from './SingleRestaurant';

/**
 * COMPONENT
 */
export const UserContext = createContext();
export const Home = (props) => {
  const { username } = props;

  return (
    <UserContext.Provider value={username}>
      <div>
        <h3>Welcome, {username}</h3>
        <h5>
          <Link to={`/home/${username}/restaurants`}>
            {' '}
            All Restaurants Page
          </Link>
        </h5>
        <div id="landing-page">
          <Switch>
            <Route
              exact
              path={`/home/${username}/restaurants`}
              component={RestaurantsLandingPage}
            />
            <Route
              exact
              path={`/home/${username}/restaurants/:id`}
              component={SingleRestaurant}
            />
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
