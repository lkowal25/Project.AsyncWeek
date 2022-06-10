import React from 'react';
import useCollapse from 'react-collapsed';
import InnerCollapsible from './InnerCollapsible';

function Collapsible() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? 'Close' : 'Open'}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          Now you can see the hidden content. <br />
          <br />
          Click <i>Close</i> to hide everything... <br />
          <br />
          <InnerCollapsible />
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
