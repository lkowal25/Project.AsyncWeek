import axios from 'axios';
import { use } from 'chai';
import React, { useEffect } from 'react';
import FirstCollapsible from '../customComponents/CollapsibleLists/FirstCollapsibleList';

const SingleRestaurant = (props) => {
  return (
    <div>
      <h2>THIS IS A SINGLE RESTAURANT</h2>
      <FirstCollapsible />
    </div>
  );
};
export default SingleRestaurant;
