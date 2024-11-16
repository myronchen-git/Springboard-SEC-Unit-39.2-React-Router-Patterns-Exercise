import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import AppSelector from './AppSelector';
import ColorFactoryApp from './ColorFactoryApp';
import ColorList from './components/ColorList';
import ColorNew from './components/ColorNew';
import ColorPage from './components/ColorPage';
import DogFinderApp from './DogFinderApp';
import DogDetails from './components/DogDetails';
import DogList from './components/DogList';

import './index.css';

// ==================================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
);

// ==================================================

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
