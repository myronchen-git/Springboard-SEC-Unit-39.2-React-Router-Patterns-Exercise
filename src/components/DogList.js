import { useNavigate } from 'react-router-dom';

// ==================================================

/**
 * Displays a list of names and pictures for dogs, and links to their details
 * page.
 *
 * @param {Object} props - The properties for this component.
 * @param {Object[]} props.dogs - The dogs to list.
 * @param {String} props.dogs[].name - Name of a dog.
 * @param {String} props.dogs[].age - Age of a dog.
 * @param {String} props.dogs[].src - Image name of a dog, without extension.
 * @param {String[]} props.dogs[].facts - A list of facts about a dog.
 * @param {String} props.dogs[].id - ID of a dog, which is given by json-server
 *   module.
 */
function DogList({ dogs }) {
  const navigate = useNavigate();

  return (
    <main className="DogList">
      <h2>List of Dogs</h2>
      <ol>
        {dogs.map((dog) => (
          <li
            key={dog.id}
            className="DogList__dog"
            onClick={() => navigate(`/dogs/${dog.id}`)}
          >
            <p>{dog.name}</p>
            <img src={dog.src + '.jpg'} alt={dog.name} />
          </li>
        ))}
      </ol>
    </main>
  );
}

// ==================================================

export default DogList;
