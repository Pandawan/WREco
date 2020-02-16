import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import InformationView from 'views/informationView';
import MainView from 'views/mainView';
import ResponseView from 'views/responseView';
import ChoiceView from 'views/choiceView';
import Navbar from 'components/navbar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  app: {
    background: 'linear-gradient(45deg, rgba(97,130,226,1) 0%, rgba(143,203,227,1) 75%)',
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
