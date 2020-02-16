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
    boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
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
  const { className, children, onClick, rounded } = props;
  const { crd, container, roundedCrd, clickableCrd } = useStyles();

  return (
    <div className={crd + (rounded ? ' ' + roundedCrd : '') + (onClick ? ' ' + clickableCrd : '') + ' ' + className} onClick={onClick}>
      <div className={container}>
        {children}
      </div>
    </div>
  );
}

export default Card;