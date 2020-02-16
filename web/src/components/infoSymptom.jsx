import React from 'react';
import symptomsData from '../data/symptoms';

function InfoSymptom(props) {
  const { symptoms } = props;
  let keyData = {};
  for (let i = 0; i < symptoms.length; i++) {
    if (Object.keys(symptomsData).includes(symptoms[i])) {
      keyData = symptomsData[symptoms[i]];
    }
  }
  const mystyle = {
    height: 'auto',
    width: 'auto',
    maxWidth: '200px',
    maxHeight: '200px'
  };
  console.log(symptoms);
  return (
    <div>
      <h2>{keyData.name}</h2>
      <img src={keyData.image} alt='condimg' style={mystyle} />
      <p style={{ width: '200px' }}>{keyData.summary}</p>
    </div>
  );
}

export default InfoSymptom;
