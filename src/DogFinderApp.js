import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import DogList from './components/DogList';
import DogDetails from './components/DogDetails';
import './DogFinderApp.css';

// ==================================================

/**
 * App for looking thru dogs and their details.
 */
function DogFinderApp() {
  const [dogs, setDogs] = useState([]);

  // Get dog data in JSON from API.
  useEffect(() => {
    axios
      .get('http://localhost:5001/dogs')
      .then((resp) => setDogs(resp.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="DogFinderApp">
      <h1>Dog Finder</h1>
      <Routes>
        <Route path="/dogs" element={<DogList dogs={dogs} />} />
        <Route path="/dogs/:id" element={<DogDetails dogs={dogs} />} />
        <Route path="*" element={<Navigate to="/dogs" />} />
      </Routes>
    </div>
  );
}

// ==================================================

export default DogFinderApp;
