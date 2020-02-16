import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import ErrorMessage from 'components/errorMessage';
import InputField from 'components/inputField';
import Button from 'components/button';

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
  }
});

function InformationView() {
  const history = useHistory();

  const { mainContainer, form } = useStyles();

  const [nameInput, setNameInput] = useState('');
  const [telInput, setTelInput] = useState('');
  const [historyInput, setHistoryInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setInformation] = useInformation(null);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <h2>Information</h2>
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
        <Button label="Submit" onClick={async (event) => {
          event.preventDefault();

          if (!nameInput || !telInput || !historyInput) {
            setErrorMessage('All fields are required.');
            return;
          }

          const data = { name: nameInput, tel: telInput, history: historyInput };
          setInformation(data);
          history.push('/');
        }}/>
      </form>
    </div>
  );
}

export default InformationView;
