import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Models from './components/pages/Models';
import Models2D from './components/pages/Models2D';
import Navbar from './components/layout/Navbar';


const App = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/3d-models" element={<Models/>} />
        <Route path="/2d-models" element={<Models2D/>} />
    </Routes>
    </div>
  );
};

export default App;
