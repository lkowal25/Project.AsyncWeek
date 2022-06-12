import React from 'react';
import useCollapse from 'react-collapsed';
// import InnerCollapsible from 'InnerCollapsible';

export default function SecondCollapsibleList() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          This is the inner div <br />
          <br />
          Click <i>Collapse</i> to hide this content...
        </div>
      </div>
    </div>
  );
}
