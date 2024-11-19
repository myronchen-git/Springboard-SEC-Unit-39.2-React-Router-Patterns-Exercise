import { useNavigate, useOutletContext } from 'react-router-dom';

import './DogList.css';

// ==================================================

/**
 * Displays a list of names and pictures for dogs, and links to their details
 * page.
 */
function DogList() {
  /**
   * @type {Object[]} dogs - The dogs to list.
   * @type {String} dogs[].name - Name of a dog.
   * @type {String} dogs[].age - Age of a dog.
   * @type {String} dogs[].src - Image name of a dog, without extension.
   * @type {String[]} dogs[].facts - A list of facts about a dog.
   * @type {String} dogs[].id - ID of a dog, which is given by json-server
   *   module.
   */
  const { dogs } = useOutletContext();
  const navigate = useNavigate();

  return (
    <main className="DogList">
      <h2>List of Dogs</h2>
      <ol className="DogList__list">
        {dogs.map((dog) => (
          <li
            key={dog.id}
            className="DogList__dog"
            onClick={() => navigate(`/dogs/${dog.id}`)}
          >
            <h3>{dog.name}</h3>
            <img src={dog.src + '.jpg'} alt={dog.name} />
          </li>
        ))}
      </ol>
    </main>
  );
}

// ==================================================

export default DogList;
