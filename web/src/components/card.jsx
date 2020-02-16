import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  crd: {
    background: 'white',
    color: '#333',
    padding: '0.75rem 1rem',
    minWidth: '3rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    border: '2px solid transparent',
    borderRadius: '2em',
    textAlign: 'center',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)',
    outline: 'none',
    '&:hover': {
      cursor: 'pointer'
    },
  },
  roundedCrd: {
    borderRadius: '5rem',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function Card(props) {
  const { children, onClick, rounded } = props;
  const { crd, container, roundedCrd, clickableCrd } = useStyles();

  return (
    <div className={crd + (rounded ? ' ' + roundedCrd : '') + (onClick ? ' ' + clickableCrd : '')} onClick={onClick}>
      <div className={container}>
        {children}
      </div>
    </div>
  );
}

export default Card;