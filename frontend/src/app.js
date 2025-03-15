import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Resume from './components/Resume';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/assessment" component={Assessment} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/resume" component={Resume} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;