import { Link } from 'react-router-dom';

import './ColorList.css';

// ==================================================

/**
 * Displays the list of saved colors and a way to add a new color.
 *
 * @param {Object} props - The properties for this component.
 * @param {Object} props.colors - Contains color name and hex value pairs.
 */
function ColorList({ colors }) {
  return (
    <>
      <section className="ColorList__new-color">
        <h2>Welcome to the color factory.</h2>
        <Link to="/colors/new">Add a color</Link>
      </section>
      <section className="ColorList__color-selection">
        <h2>Please select a color.</h2>
        <ul>
          {Object.keys(colors).map((name) => (
            <li key={name}>
              <Link to={`/colors/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// ==================================================

export default ColorList;
