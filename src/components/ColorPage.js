import { Link, Navigate, useParams } from 'react-router-dom';

import './ColorPage.css';

// ==================================================

/**
 * Displays a page filled with the chosen color.
 *
 * @param {Object} props - The properties for this component.
 * @param {Function} props.getColorHex - Uses function to get hex value of a
 *   color, instead of receiving all saved colors.
 */
function ColorPage({ getColorHex }) {
  const { color } = useParams();

  const colorHex = getColorHex(color);

  if (colorHex) {
    return (
      <main className="ColorPage" style={{ backgroundColor: colorHex }}>
        <p>{color.toUpperCase()}</p>
        <Link to="/colors">GO BACK</Link>
      </main>
    );
  } else {
    return <Navigate to="/colors" />;
  }
}

// ==================================================

export default ColorPage;
