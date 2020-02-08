import React from 'react';
import './App.css';
import SelectStock from "./containers/SelectStock";
import { Route, Switch } from 'react-router-dom';
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path="/chartStock" component={SelectStock} />
            <Route path="/test" exact component={Home} />
        </Switch>
    </div>
  );
}

export default App;
