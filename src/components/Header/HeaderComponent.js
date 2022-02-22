import React from 'react';
import PropTypes from 'prop-types';
import { HeaderWrapper } from './Header.style.js';

const HeaderComponent = ({ children, bg }) => {
  return <HeaderWrapper bg={bg}>{children}</HeaderWrapper>;
};

export default HeaderComponent;

HeaderComponent.propTypes = {
  children: PropTypes.elementType.isRequired,
  bg: PropTypes.string
};
