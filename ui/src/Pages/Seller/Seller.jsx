import React from 'react';
import SideNavBar from '../Sidebar/Navbar';
import Maiin from './maiin';  // Assuming that 'maiin' is a component and not a typo

const Seller = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNavBar />
      <Maiin />
    </div>
  );
}

export default Seller;
