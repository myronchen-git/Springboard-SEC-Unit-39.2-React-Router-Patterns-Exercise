import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import DogNav from './components/DogNav';

import './DogFinderApp.css';

// ==================================================

/**
 * App for looking thru dogs and their details.
 */
function DogFinderApp() {
  /**
   * @type {Object[]} dogs - List of dogs.
   * @type {String} dogs[].name - Name of a dog.
   * @type {String} dogs[].age - Age of a dog.
   * @type {String} dogs[].src - Image name of a dog, without extension.
   * @type {String[]} dogs[].facts - A list of facts about a dog.
   * @type {String} dogs[].id - ID of a dog, which is given by json-server
   *   module.
   */
  const [dogs, setDogs] = useState([]);

  // Get dog data in JSON from API.
  useEffect(() => {
    axios
      .get('http://localhost:5001/dogs')
      .then((resp) => setDogs(resp.data))
      .catch((err) => console.error(err));
  }, []);

  /**
   * Gets data for a specific dog.
   *
   * @param {String} id - ID of a dog, which is given by json-server module.
   * @returns {Object} Dog data.
   */
  function getDog(id) {
    return dogs.find((dog) => dog.id === id);
  }

  const navData = dogs.map((dog) => ({ name: dog.name, id: dog.id }));

  return (
    <div className="DogFinderApp">
      <DogNav navData={navData} />
      <h1>Dog Finder</h1>
      <Outlet context={{ dogs, getDog }} />
    </div>
  );
}

// ==================================================

export default DogFinderApp;
