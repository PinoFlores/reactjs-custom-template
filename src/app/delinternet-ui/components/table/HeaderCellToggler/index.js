import * as React from 'react';

import { CrossIcon, IconButton, SearchIcon } from 'evergreen-ui';

/**
 * Control to toggle components into cell inside columns headers.
 *
 * @param {Object} { isActive, setIsActive, icon }
 *
 * @author Jose Aburto <pino0071@gmail.com>
 * @version 1.0.0
 */
export const HeaderCellToggler = ({ isActive, setIsActive, icon }) => {
  /**
   * Set a default icon in case clients dont that prop.
   *
   * @returns {Component} icon
   */
  const mainIcon = () => (icon ? icon : SearchIcon);

  /**
   * Event handler for change parent state.
   */
  const handleSetIsActive = () => {
    setIsActive(pre => !pre);
  };

  return (
    <IconButton
      iconSize={13}
      appearance="minimal"
      onClick={handleSetIsActive}
      icon={isActive ? CrossIcon : mainIcon()}
    />
  );
};
