import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import InformationView from 'views/informationView';
import MainView from 'views/mainView';
import ResponseView from 'views/responseView';
import ChoiceView from 'views/choiceView';
import VirtualWaitingRoomView from 'views/virtualWaitingRoom';
import Navbar from 'components/navbar';

const useStyles = createUseStyles({
  app: {
    background: 'linear-gradient(45deg, #6565e8 0%, #82eef2 100%)',
    width: '100%',
    height: '100%'
  }
});

function App() {
  const { app } = useStyles();

  return (
    <div className={app}>
      <header>
        <Navbar />
      </header>
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/response">
              <ResponseView />
            </Route>
            <Route path="/information">
              <InformationView />
            </Route>
            <Route path="/choice">
              <ChoiceView />
            </Route>
            <Route path="/room">
              <VirtualWaitingRoomView />
            </Route>
            <Route path="/">
              <MainView />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
