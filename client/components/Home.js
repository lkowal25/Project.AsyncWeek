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
  const { username, zipcode, id } = props;
  console.log('HOME Line 13: Zipcode', zipcode);

  return (
    <UserContext.Provider value={{ username, zipcode, id }}>
      <div>
        <h3>Welcome, {username}</h3>
        <h5>
          <Link to={`/home/${id}/restaurants`}>
            {' '}
            Restaurants Near {zipcode}
          </Link>
        </h5>
        <div id="landing-page">
          <Switch>
            <Route
              exact
              path={`/home/${id}/restaurants`}
              component={RestaurantsLandingPage}
            />
            <Route
              exact
              path={`/home/${id}/restaurants/:id`}
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
    zipcode: state.auth.zipcode,
    id: state.auth.id,
  };
};

export default connect(mapState)(Home);
