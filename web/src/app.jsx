import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainView from 'views/mainView';
import ResponseView from 'views/responseView';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/response">
            <ResponseView />
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
