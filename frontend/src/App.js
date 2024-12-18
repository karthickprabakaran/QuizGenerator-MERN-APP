import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'; // Replace with your component paths
import Login from './Pages/Login'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
