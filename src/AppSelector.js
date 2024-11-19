import { Link } from 'react-router-dom';

import './AppSelector.css';

// ==================================================

/**
 * The main menu to choose between the apps.
 */
function AppSelector() {
  return (
    <main className="AppSelector">
      <Link className="AppSelector__appBox" to="/dogs">
        <h1>Part 1</h1>
        <h1>Dog Finder</h1>
      </Link>
      <Link className="AppSelector__appBox" to="/colors">
        <h1>Part 2</h1>
        <h1>Color Factory</h1>
      </Link>
    </main>
  );
}

// ==================================================

export default AppSelector;
