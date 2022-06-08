import axios from 'axios';
// import history from '../history';

const TOKEN = 'token';

//ACTION TYPES

const ALL_RESTAURANTS = 'ALL_RESTAURANTS';
const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';

//ACTION CREATORS

const gotAllRestaurants = (restaurants) => ({
  type: ALL_RESTAURANTS,
  restaurants,
});

const _createRestaurant = (restaurant) => ({
  type: CREATE_RESTAURANT,
  restaurant,
});

const _updateRestaurant = (restaurant) => ({
  type: UPDATE_RESTAURANT,
  restaurant,
});

const _deleteRestaurant = (restaurant) => ({
  type: DELETE_RESTAURANT,
  restaurant,
});

//THUNK CREATORS

// export const getAllRestaurants = () => async (dispatch) => {
//   const { data: restaurants } = await axios.get('/api/restaurants');
//   dispatch(gotAllRestaurants(restaurants));
// };

export const getAllRestaurants = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  console.log('here is the token', token);
  if (token) {
    const { data: restaurants } = await axios.get('/api/restaurants', {
      headers: {
        authorization: token,
      },
    });
    dispatch(gotAllRestaurants(restaurants));
  }
};

export const createRestaurant = (restaurant, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/restaurants', restaurant);
    dispatch(_createRestaurant(created));
    history.push('/restaurants');
  };
};

export const updateRestaurant = (restaurant, history) => async (dispatch) => {
  const { data: updated } = await axios.put('/restaurants', restaurant);
  dispatch(_updateRestaurant(updated));
  history.push('/restaurants');
};

export const deleteRestaurant = (id, history) => async (dispatch) => {
  const { data: deleted } = await axios.delete(`/restaurants/${id}`);
  dispatch(_deleteRestaurant(deleted));
  history.push('/restaurants');
};

export default function (state = [], action) {
  switch (action.type) {
    case ALL_RESTAURANTS:
      return action.restaurants;
    case UPDATE_RESTAURANT:
      return state.map((restaurant) => {
        return restaurant.id === action.restaurant.id
          ? action.restaurant
          : restaurant;
      });
    case DELETE_RESTAURANT:
      return state.filter(
        (restaurant) => restaurant.id !== restaurant.robot.id
      );
    case CREATE_RESTAURANT:
      return [...state, action.restaurant];

    default:
      return state;
  }
}
