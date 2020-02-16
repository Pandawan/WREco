import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  btn: {
    background: 'lightblue',
    color: 'white',
    padding: '0.75rem 1rem',
    minWidth: '3rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    outline: 'none',
    border: '2px solid transparent'
  }
});

function Button(props) {
  const { label, onClick } = props;
  const { btn } = useStyles();

  return (
    <button className={btn} onClick={onClick}>{label}</button>
  );
}

export default Button;