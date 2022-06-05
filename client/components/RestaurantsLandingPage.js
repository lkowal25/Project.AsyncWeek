import { use } from 'chai';
import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { createRestaurant, getAllRestaurants } from '../store/restaurants';
import { Link } from 'react-router-dom';
import ScrollBox from '../customComponents/HorizontalScrollMenu';
import { UserContext } from './Home';

export const RestaurantsLandingPage = (props) => {
  const [open, setOpen] = useState(false);
  const username = useContext(UserContext);

  const map = new Map();
  const map2 = new Map();
  const restauraunts = props.restaurants;

  const [nationality, setNationality] = useState('');

  for (let i = 0; i < restauraunts.length; ++i) {
    const curRest = restauraunts[i];
    const curName = curRest.nationality;

    //slower than obj[i] = i but maps can use non strings as keys!
    //they can also easily be converted back and forth to / from arrays

    //also this allows us to set a conditional || on our value w/o if statement **get is also faster than obj[varName] **
    map.set(curName, map.get(`${curName}`) + 1 || 1);

    //using a string as a key faster than set to use obj[string]
    map2[curName] = curRest;
  }

  const sortedRest = restauraunts.sort(function (a, b) {
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

  const sideBar = Array.from(map);

  useEffect(() => {
    props.getAllRestaurants();
  }, []);

  return (
    <div>
      <h2>RESTAURANTS NEAR YOU HERE</h2>

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
      <div>
        <ul>
          {restauraunts && restauraunts.length > 0
            ? restauraunts
                .filter(
                  (restauraunt) => restauraunt.nationality === nationality
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
  getAllRestaurants: () => dispatch(getAllRestaurants()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsLandingPage);
