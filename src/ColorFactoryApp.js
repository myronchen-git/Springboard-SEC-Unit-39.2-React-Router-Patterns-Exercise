import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import './ColorFactoryApp.css';

// ==================================================

/**
 * App for viewing colors by name and saving new colors.
 */
function ColorFactoryApp() {
  const [colors, setColors] = useState({
    blue: '#0000FF',
    green: '#008000',
    red: '#FF0000',
  });

  /**
   * Gets the hex value of a saved color.
   *
   * @param {String} name - Name of a color.
   * @returns {String} Hex value of the specified color.
   */
  function getColorHex(name) {
    return colors[name];
  }

  /**
   * Adds new color to colors state.
   *
   * @param {Object} color - Contains color name and value ({ name: value }).
   */
  function saveColor(color) {
    setColors((colors) => ({ ...colors, ...color }));
  }

  return (
    <main className="ColorFactoryApp">
      <Outlet context={{ colors, getColorHex, saveColor }} />
    </main>
  );
}

// ==================================================

export default ColorFactoryApp;
