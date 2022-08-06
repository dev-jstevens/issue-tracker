import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Landing />} />
    </Routes>
    </Router>
  );
}

export default App;
