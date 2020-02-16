import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  btn: {
    background: '#1C6CB6',
    color: 'white',
    padding: '0.75rem 1rem',
    minWidth: '3rem',
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    border: '2px solid transparent',
    borderRadius: '2em',
    textAlign: 'center',
    boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
    outline: 'none'
  },
  clickableBtn: {
    '&:hover': {
      background: '#1963a9',
      cursor: 'pointer'
    },
    '&:active, &:focus': {
      background: '#175b9b'
    }
  },
  roundedBtn: {
    borderRadius: '5rem',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function Button(props) {
  const { className, children, onClick, rounded, notClickable } = props;
  const { btn, container, roundedBtn, clickableBtn } = useStyles();

  const classes = [
    btn,
    rounded ? roundedBtn : undefined,
    notClickable ? undefined : clickableBtn,
    className
  ].filter(value => value);

  return (
    <button className={classes.join(' ')} onClick={onClick}>
      <div className={container}>
        {children}
      </div>
    </button>
  );
}

export default Button;