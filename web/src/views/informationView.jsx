import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import ErrorMessage from 'components/errorMessage';
import InputField from 'components/inputField';
import Button from 'components/button';
import Title from 'components/title';

const useInformation = createPersistedState('information');

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    padding: '0 1rem',
    maxWidth: '50rem'
  },
  form: {
    '& > *': {
      margin: '1rem 0'
    }
  },
  submitDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
});

function InformationView() {
  const history = useHistory();

  const { mainContainer, form, submitDiv } = useStyles();

  const [nameInput, setNameInput] = useState('');
  const [telInput, setTelInput] = useState('');
  const [historyInput, setHistoryInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setInformation] = useInformation(null);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <Title>Information</Title>
        <InputField 
          name="Name*"
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <InputField 
          name="Phone*"
          type="tel"
          value={telInput}
          onChange={(event) => setTelInput(event.target.value)}
        />
        <InputField 
          name="Past Medical History*"
          type="textarea"
          value={historyInput}
          onChange={(event) => setHistoryInput(event.target.value)}
        />
        {errorMessage
          ? (
            <ErrorMessage>
              <p>Error: {errorMessage}</p>
            </ErrorMessage>
          )
          : null
        }
        <div className={submitDiv}>
        <Button rounded onClick={async (event) => {
          event.preventDefault();

          if (!nameInput || !telInput || !historyInput) {
            setErrorMessage('All fields are required.');
            return;
          }

          const data = { name: nameInput, tel: telInput, history: historyInput };
          setInformation(data);
          history.push('/choice');
        }}>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default InformationView;
