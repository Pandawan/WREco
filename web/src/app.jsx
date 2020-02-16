import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import InformationView from 'views/informationView';
import MainView from 'views/mainView';
import ResponseView from 'views/responseView';
import Navbar from 'components/navbar';
import InfoView from 'views/infoView';

function App() {
  return (
    <div className='app'>
      <header>
        <Navbar />
      </header>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path='/response'>
              <ResponseView />
            </Route>
            <Route path='/information'>
              <InformationView />
            </Route>
            <Route path='/info'>
              <InfoView />
            </Route>
            <Route path='/'>
              <MainView />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
