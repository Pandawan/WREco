import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  container: {
    display: 'block',
    padding: '1rem',
    margin: '0.5rem',
    backgroundColor: 'rgba(206, 17, 38, 0.05)',
    overflowX: 'auto',
    borderRadius: '0.25rem'
  },
  content: {
    margin: '0.5rem 0'
  }
});

function ErrorMessage(props) {
  const { message } = props;
  const { container, content } = useStyles();

  return (
    <div className={container}>
      <p className={content}>Error: {message}</p>
      <Link to="/">Return home?</Link>
    </div>
  );
}

export default ErrorMessage;