import React from 'react';
import symptomsData from '../data/symptoms';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  image: {
    width: '100%'
  }
});

function InfoSymptom(props) {
  const { symptoms } = props;
  const { image } = useStyles();

  console.log(props);

  let keyData = {};
  for (let i = 0; i < symptoms.length; i++) {
    if (Object.keys(symptomsData).includes(symptoms[i])) {
      keyData = symptomsData[symptoms[i]];
    }
  }
  console.log(symptoms);
  return (
    <div>
      <h2>{keyData.name}</h2>
      <img src={keyData.image} alt='condimg' className={image} />
      <p>{keyData.summary}</p>
    </div>
  );
}

export default InfoSymptom;
