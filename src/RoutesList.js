import { Navigate, Route, Routes } from 'react-router-dom';

import AppSelector from './AppSelector';
import ColorFactoryApp from './ColorFactoryApp';
import ColorList from './components/ColorList';
import ColorNew from './components/ColorNew';
import ColorPage from './components/ColorPage';
import DogFinderApp from './DogFinderApp';
import DogDetails from './components/DogDetails';
import DogList from './components/DogList';

// ==================================================

const RoutesList = () => (
  <Routes>
    <Route path="/" element={<AppSelector />} />
    <Route element={<DogFinderApp />}>
      <Route path="/dogs" element={<DogList />} />
      <Route path="/dogs/:id" element={<DogDetails />} />
    </Route>
    <Route element={<ColorFactoryApp />}>
      <Route path="/colors" element={<ColorList />} />
      <Route path="/colors/:color" element={<ColorPage />} />
      <Route path="/colors/new" element={<ColorNew />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

// ==================================================

export default RoutesList;
