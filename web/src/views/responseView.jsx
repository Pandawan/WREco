import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ErrorMessage from 'components/errorMessage';

function ResponseView() {
  const { state } = useLocation();

  if (!state) {
    return (
      <ErrorMessage>
        <p>Error: 400 Bad Request</p>
        <Link to="/">Go home?</Link>
      </ErrorMessage>
    );
  }

  return (
    <div>
      <code>
        {JSON.stringify(state, null, '\t')}
      </code>
    </div>
  );
}

export default ResponseView;