import axios from 'axios';
import { use } from 'chai';
import React, { useEffect } from 'react';
import Collapsible from '../customComponents/CollapsibleLists/RestaurantSections';

const SingleRestaurant = (props) => {
  return (
    <div>
      <h2>THIS IS A SINGLE RESTAURANT</h2>
      <Collapsible />
    </div>
  );
};
export default SingleRestaurant;
