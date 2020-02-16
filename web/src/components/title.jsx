import React from 'react';
import { createUseStyles } from 'react-jss';

import Button from './button';

const useStyles = createUseStyles({
  title: {
    margin: 0,
    padding: 0
  }
});

function Title(props) {
  const { children } = props;
  const { title } = useStyles();

  return (
    <Button rounded notClickable onClick={(event) => event.preventDefault()}>
      <h2 className={title}>
        {children}
      </h2>
    </Button>
  );
}

export default Title;