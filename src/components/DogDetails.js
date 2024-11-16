import { useOutletContext, useParams } from 'react-router-dom';

// ==================================================

/**
 * Displays details of a dog.  If a dog can not be found, displays
 * "Dog not found!".
 */
function DogDetails() {
  const { id } = useParams();

  /**
   * @type {Object[]} dogs - List of dogs to display.
   * @type {String} dogs[].name - Name of a dog.
   * @type {String} dogs[].age - Age of a dog.
   * @type {String} dogs[].src - Image name of a dog, without extension.
   * @type {String[]} dogs[].facts - A list of facts about a dog.
   * @type {String} dogs[].id - ID of a dog, which is given by json-server
   *   module.
   */
  const { getDog } = useOutletContext();

  const currentDog = getDog(id);

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
