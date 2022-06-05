import axios from 'axios';
import { use } from 'chai';
import React, { useEffect } from 'react';

const SingleRestaurant = async (props) => {
  // const zipcodes = await axios.get(
  //   'https://[subdomain].promaptools.com/service/us/zips-inside-radius/get/?radius=10&lat=41.8940415&lng=-93.59&key=[USERKEY]'
  // );

  console.log(zipcodes);
  return (
    <div>
      <h2>THIS IS A SINGLE RESTAURANT</h2>
    </div>
  );
};

export default SingleRestaurant;
