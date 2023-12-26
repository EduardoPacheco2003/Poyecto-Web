import React from "react";

const HeaderHamburgerButton = ({ openMenu, hamburgerButton }) => {
  return (
    <button
      className="panel-btn hamburger hamburger--vortex"
      ref={hamburgerButton}
      type="button"
      onClick={openMenu}>
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default HeaderHamburgerButton;
