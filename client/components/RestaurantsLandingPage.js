import { use } from 'chai';

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useEventListener } from './CustomHooks/useEventListener';
import ScrollBox from '../customComponents/HorizontalScrollMenu';
import { UserContext } from './Home';

import { connect } from 'react-redux';
import { getAllRestaurants } from '../store/restaurants';
import { Link } from 'react-router-dom';

export const RestaurantsLandingPage = (props) => {
  const [open, setOpen] = useState(false);
  const [localRestaurants, setLocalRestaurants] = useState([]);

  const { username, zipcode, id } = useContext(UserContext);
  const [zc, setZc] = useState(zipcode);
  console.log('local - RLP ', localRestaurants);
  const map = new Map();
  const map2 = new Map();

  const restaurants = [...props.restaurants];

  const [nationality, setNationality] = useState('');

  //restaurants are filtered based on zipcode (will need to be an includes with array)
  for (let i = 0; i < restaurants.length; ++i) {
    const curRest = restaurants[i];
    const curName = curRest.nationality;

    //slower than obj[i] = i but maps can use non strings as keys!
    //they can also easily be converted back and forth to / from arrays

    //also this allows us to set a conditional || on our value w/o if statement **get is also faster than obj[varName] **
    map.set(curName, map.get(`${curName}`) + 1 || 1);

    //using a string as a key faster than set to use obj[string]
    map2[curName] = curRest;
  }

  const sortedRest = restaurants.sort(function (a, b) {
    const nameA = a.nationality.split(' ').join('').toUpperCase(); // ignore upper and lowercase
    const nameB = b.nationality.split(' ').join('').toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  //turn the map of nationalities back into an array
  const sideBar = Array.from(map);

  useEffect(() => {
    props.getAllRestaurants(id, zc);
  }, [zc]);

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setZc(e.target.value);
    }
  }

  //custom hook can be used for any element, any event useful for grouping event listeners
  useEventListener(
    'keydown',
    handleKeyDown,
    document.querySelector('#horizontal-scroll-bar > input')
  );
  return (
    <div id="horizontal-scroll-bar">
      <h3>RESTAURANTS NEAR {zc || zipcode}</h3>
      <input placeholder="zipcode"></input>
      <div>
        {sideBar.length > 0 ? (
          <ScrollBox className="box-container">
            {sideBar.map((restauraunt, idx) => {
              return (
                <button
                  key={idx}
                  className="box"
                  onClick={() => {
                    setNationality(restauraunt[0]);
                  }}
                >{`${restauraunt[0]} (${restauraunt[1]})`}</button>
              );
            })}
          </ScrollBox>
        ) : (
          <h1>There are no restaurants near {zc || zipcode}</h1>
        )}
      </div>
      <div id="restaurants-list">
        <ul>
          {restaurants && restaurants.length > 0
            ? restaurants
                .filter(
                  (restaurant) =>
                    restaurant.zipcode === zipcode &&
                    restaurant.nationality === nationality
                )
                .sort(function (a, b) {
                  const nameA = a.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
                  const nameB = b.name.split(' ').join('').toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }

                  // names must be equal
                  return 0;
                })
                .map((restauraunt, idx) => {
                  return (
                    <div key={idx} className="rest-list">
                      <li>
                        <Link
                          to={`/home/${username}/restaurants/${restauraunt.id}`}
                        >
                          {restauraunt.name}
                        </Link>
                      </li>
                    </div>
                  );
                })
            : ''}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    //will want zc and pass as prop into Rests
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllRestaurants: (userId, zipcode) =>
    dispatch(getAllRestaurants(userId, zipcode)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsLandingPage);
