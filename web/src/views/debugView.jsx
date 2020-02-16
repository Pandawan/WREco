import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import ErrorMessage from 'components/errorMessage';

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    padding: '0 1rem',
    maxWidth: '50rem'
  }
});

// Use history.push('/debug', data) to debug your data by printing it as JSON
function DebugView() {
  const { state } = useLocation();
  const { mainContainer } = useStyles();

  if (!state) {
    return (
      <ErrorMessage>
        <p>Error: 400 Bad Request</p>
        <Link to="/">Go home?</Link>
      </ErrorMessage>
    );
  }

  return (
    <div className={mainContainer}>
      <code>
        {JSON.stringify(state, null, '\t')}
      </code>
    </div>
  );
}

export default DebugView;