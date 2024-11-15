import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ColorList from './components/ColorList';
import ColorPage from './components/ColorPage';
import ColorNew from './components/ColorNew';
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
   * Adds new color to colors state.
   *
   * @param {Object} color - Contains color name and value ({ name: value }).
   */
  function saveColor(color) {
    setColors((colors) => ({ ...colors, ...color }));
  }

  return (
    <main className="ColorFactoryApp">
      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} />} />
        <Route
          path="/colors/:color"
          element={<ColorPage getColorHex={(name) => colors[name]} />}
        />
        <Route
          path="/colors/new"
          element={<ColorNew saveColor={saveColor} />}
        />
        <Route path="*" element={<Navigate to="/colors" />} />
      </Routes>
    </main>
  );
}

// ==================================================

export default ColorFactoryApp;
