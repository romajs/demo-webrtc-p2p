import React from 'react';
import './App.css';
import { Sync } from './components/Sync';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sync/:peer1/with/:peer2">
          <Sync />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
