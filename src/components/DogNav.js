import { NavLink } from 'react-router-dom';

import './DogNav.css';

// ==================================================

/**
 * The Navigation component.
 *
 * @param {Object} props - The properties for this component.
 * @param {Object[]} props.navData - Contains a list of dog data.
 * @param {String} props.navData[].name - Name of a dog.
 * @param {String} props.navData[].id - ID of a dog, which is given by
 *   json-server module.
 */
function DogNav({ navData }) {
  return (
    <nav className="DogNav">
      <NavLink to="/dogs" end>
        Home
      </NavLink>
      {navData.map((dogData) => (
        <NavLink key={dogData.id} to={'/dogs/' + dogData.id}>
          {dogData.name}
        </NavLink>
      ))}
    </nav>
  );
}

// ==================================================

export default DogNav;
