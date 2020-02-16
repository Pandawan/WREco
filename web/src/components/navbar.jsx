import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  navbar: {
  },
  innerContainer: {
    margin: '0 auto',
    padding: '0.5rem 1rem',
    maxWidth: '50rem'
  },
  title: {
    padding: 0,
    margin: 0
  }
});

function Navbar() {
  const { navbar, innerContainer, title } = useStyles();

  return (
    <nav className={navbar}>
      <div className={innerContainer}>
        <h1 className={title}>WREco</h1>
      </div>
    </nav>
  );
}

export default Navbar;