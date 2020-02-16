import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLocalStorage } from '@rehooks/local-storage';
import dayjs from 'dayjs';

import Card from 'components/card';
import Title from 'components/title';
import { calculateScore } from 'helpers/score';
import { defaultQueue } from 'helpers/defaultQueue';
import InfoSymptom from 'components/infoSymptom';

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    padding: '0 1rem',
    maxWidth: '50rem'
  },
  card: {
    margin: '1.5rem 0',
    '&:not(:first-of-type)': {
      marginTop: '3rem'
    },
    '&:not(:last-of-type)': {
      marginBottom: '3rem'
    }
  },
  queueCard: {
    width: '100%',
    margin: '0.5rem 2rem',
    boxSizing: 'border-box',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  queueCardContent: {
    width: '100%',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textTransform: 'none'
  },
  queueCardName: {
    minWidth: '12rem',
    textAlign: 'start',
    '&:empty': {
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '0.5rem'
    }
  },
  '@media (max-width: 768px)': {
    queueCardName: {
      minWidth: '45%',
      height: '1.25em',
    }
  },
  redBackground: {
    background: '#FD5959'
  },
  orangeBackground: {
    background: '#FFAF66'
  },
  yellowBackground: {
    background: '#fcd76a',//'#EFE84D',
  }
});

function VirtualWaitingRoomView() {
  const { mainContainer,
    card,
    mainCard,
    extraCard,
    queueCard,
    queueCardName,
    queueCardContent,
    redBackground,
    orangeBackground,
    yellowBackground
  } = useStyles();
  const [information] = useLocalStorage('information', null);
  const queue = useLocalStorage('queue', defaultQueue)[0]
    .map((data) => ({ ...data, score: calculateScore(data) }))
    .sort((a, b) => b.score - a.score);

    console.log(queue);

  const positionInQueue = queue.findIndex((val) => val.name === information.name);

  const waitingTime = positionInQueue * 15;
  const waitingTimeText = waitingTime === 0
    ? 'shortly'
    : (waitingTime > 60
      ? dayjs(waitingTime + ' mins').hour() + ' hours'
      : waitingTime + ' mins'
    );

  return (
    <div className={mainContainer}>
      <Title>Estimated Waiting Time: {waitingTimeText}</Title>
      <Card className={card + ' ' + mainCard}>
        <p>Queue</p>
        {queue.map((data) => (
          <Card
            notClickable
            noShadow
            className={queueCard + ' ' + (data.severity === 'critical' ? redBackground : (data.severity === 'moderate' ? orangeBackground : yellowBackground))}
            key={data.timestamp}>
            <div className={queueCardContent}>
              <span className={queueCardName}>
                {data.name === information.name
                  ? data.name
                  : undefined
                }
              </span>
              <span>Since {dayjs(data.timestamp).format('h:mm a')}</span>
            </div>
          </Card>
        ))}
      </Card>
      <Card className={card + ' ' + extraCard}>
        <p>More About Your Symptoms</p>
        <InfoSymptom symptoms={queue[positionInQueue].symptoms} />
      </Card>
    </div>
  );
}

export default VirtualWaitingRoomView;