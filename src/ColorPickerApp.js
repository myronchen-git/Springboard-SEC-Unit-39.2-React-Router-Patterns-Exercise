import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ColorList from './components/ColorList';
import './ColorPickerApp.css';

// ==================================================

/**
 * App for viewing colors by name and saving new colors.
 */
function ColorPickerApp() {
  const [colors, setColors] = useState({
    red: '#FF0000',
    green: '#008000',
    blue: '#0000FF',
  });

  return (
    <main className="ColorPickerApp">
      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} />} />
        <Route path="*" element={<Navigate to="/colors" />} />
      </Routes>
    </main>
  );
}

// ==================================================

export default ColorPickerApp;
