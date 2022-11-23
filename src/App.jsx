import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Welcome from './components/pages/Welcome/Welcome';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
