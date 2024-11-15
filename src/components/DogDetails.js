import { useParams } from 'react-router-dom';

// ==================================================

/**
 * Displays details of a dog.  If a dog can not be found, displays
 * "Dog not found!".
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
function DogDetails({ dogs }) {
  const { id } = useParams();

  const currentDog = dogs.find((dog) => dog.id === id);

  if (currentDog) {
    return (
      <main className="DogDetails">
        <img
          className="DogDetails__profile-photo"
          src={`${process.env.PUBLIC_URL}/${currentDog.src}.jpg`}
          alt={currentDog.name}
        />
        <h2 className="DogDetails__name">{currentDog.name}</h2>
        <p className="DogDetails__age">Age: {currentDog.age}</p>
        <div className="DogDetails__facts">
          <p>Facts:</p>
          <ul>
            {currentDog.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      </main>
    );
  } else {
    return (
      <main className="DogDetails">
        <p>Dog not found!</p>
      </main>
    );
  }
}

// ==================================================

export default DogDetails;
