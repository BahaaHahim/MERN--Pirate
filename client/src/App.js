import React from 'react';
import './App.css';
import {Router, Redirect} from '@reach/router';

import AllPirates from './components/AllPirates';
import CreatePirate from './components/CreatePirate';
import ShowPirate from './components/ShowPirate';

function App() {

  return (
    <div>
      <div className="App">
        <Router>
          <AllPirates path="/"/>   
          <CreatePirate path="/pirate/new"/>
          <ShowPirate path="/pirate/:id"/>
        </Router>
      </div>
    </div>
  );
}

export default App;
