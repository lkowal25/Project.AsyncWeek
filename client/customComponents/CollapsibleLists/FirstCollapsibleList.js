import React, { useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';
import CustomRestaurantSections from './CustomRestaurantSections';
import { useEventListener } from '../../components/CustomHooks/useEventListener';
import { use } from 'chai';

function FirstCollapsible(props) {
  const config = {
    duration: 2000,
    handleOnClick,
  };

  //state was lifted to Comp > RLP and drilled back down
  const { isExpanded, setExpanded } = props;

  //this captures the state of the first collapsible div
  const [toggle, setToggle] = useState();

  const { getCollapseProps, getToggleProps } = useCollapse(config);

  function handleOnClick(e) {
    // Do more stuff with the click event!
    // Or, set isExpanded conditionally

    setExpanded(!isExpanded);
    setToggle(getToggleProps()['aria-expanded']);
  }

  function closeWhenDone() {
    setToggle(!toggle);

    if (isExpanded === true) {
      document.querySelector('#react-collapsed-toggle-4').click();
    }
  }

  //need to grab toggleprops from the collapsible div
  useEventListener(
    'click',
    handleOnClick,
    document.querySelector('#restaurants-list > ul > div > div > div.header')
  );

  //the horizontal scroll bar (want it closed when we move to a new button)
  useEventListener(
    'click',
    closeWhenDone,
    document.querySelector(
      '#horizontal-scroll-bar > div:nth-child(3) > div > div > div'
    )
  );

  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded
          ? 'Click to close ' + props.name
          : 'Click to open ' + props.name}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <CustomRestaurantSections />
        </div>
      </div>
    </div>
  );
}

export default FirstCollapsible;
