import React from 'react';
import useCollapse from 'react-collapsed';
// import InnerCollapsible from 'InnerCollapsible';

export default function InnerCollapsible() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          Now you can see the hidden content. <br />
          <br />
          Click <i>Collapse</i> to hide this content...
        </div>
      </div>
    </div>
  );
}
