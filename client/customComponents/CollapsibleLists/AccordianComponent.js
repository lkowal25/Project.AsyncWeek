import React from 'react';
import useCollapse from 'react-collapsed';
import PropTypes from 'prop-types';

export default function MultiList(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <div className="title">{props.title}</div>
        <div className="icon">
          <i
            className={'fas fa-chevron-circle-' + (isExpanded ? 'up' : 'down')}
          ></i>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

MultiList.propTypes = {
  children: PropTypes.node.isRequired,
};
