import React from 'react';
import { createUseStyles } from 'react-jss';
import Card from 'components/card';
import Title from 'components/title';

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    padding: '0 1rem',
    maxWidth: '50rem'
  },
  card: {
    margin: '3rem 0',
    '&:not(:first-child)': {
      marginTop: '3rem'
    },
    '&:not(:last-child)': {
      marginBottom: '3rem'
    }
  }
});

function VirtualWaitingRoomView() {
  const { mainContainer, card, mainCard, extraCard } = useStyles();

  const waitingTime = '5 mins';

  return (
    <div className={mainContainer}>
      <Title>Estimated Waiting Time: {waitingTime}</Title>
      <Card className={card + ' ' + mainCard}>Main Content</Card>
      <Card className={card + ' ' + extraCard}>Extra Content</Card>
    </div>
  );
}

export default VirtualWaitingRoomView;