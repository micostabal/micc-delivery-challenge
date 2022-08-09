import React from 'react';
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import HistoricalResults from './components/ResultsTable';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <div className="body" style={
          {
            "display": "flex",
            "flexDirection": "row",
            "justifyContent": "space-around"
          }
        }>
          <Routes>
            <Route exact path='/' element={< MainPage />}></Route>
            <Route exact path='/historical-results' element={< HistoricalResults />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
