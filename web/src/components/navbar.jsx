import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  navbar: {
  },
  innerContainer: {
    margin: '0 auto',
    padding: '1rem',
    maxWidth: '50rem'
  },
  title: {
    padding: 0,
    margin: 0,
    '& > a': {
      color: 'white',
      textDecoration: 'none'
    }
  }
});

function Navbar() {
  const { navbar, innerContainer, title } = useStyles();

  return (
    <nav className={navbar}>
      <div className={innerContainer}>
        <h1 className={title}><Link to="/">Waitless</Link></h1>
      </div>
    </nav>
  );
}

export default Navbar;