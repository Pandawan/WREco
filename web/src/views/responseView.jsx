import React from 'react';
import { useLocation } from 'react-router-dom';
import ErrorMessage from 'components/errorMessage';

function ResponseView() {
  const { state } = useLocation();

  if (!state) {
    return <ErrorMessage message="400 Bad Request" />;
  }

  return (
    <div>
      <code>
        { JSON.stringify(state, null, '\t') }
      </code>
    </div>
  );
}

export default ResponseView;