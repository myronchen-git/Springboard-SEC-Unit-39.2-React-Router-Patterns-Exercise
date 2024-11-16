import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom';

import './ColorPage.css';

// ==================================================

/**
 * Displays a page filled with the chosen color.
 */
function ColorPage() {
  /**
   * @type {Function} getColorHex - Gets the hex value of a specific, saved
   *   color; instead of receiving all saved colors.
   */
  const { getColorHex } = useOutletContext();
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
