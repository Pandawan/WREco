import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'block',
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    backgroundColor: 'rgba(206, 17, 38, 0.05)',
    overflowX: 'auto',
    borderRadius: '0.25rem'
  }
});

function ErrorMessage(props) {
  const { children } = props;
  const { container } = useStyles();

  return (
    <div className={container}>
      {children}
    </div>
  );
}

export default ErrorMessage;