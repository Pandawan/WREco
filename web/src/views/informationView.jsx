import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';
import ErrorMessage from 'components/errorMessage';

const useInformation = createPersistedState('information');

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    maxWidth: '50rem'
  },
  form: {
    '& > *': {
      margin: '0.5rem 0'
    }
  },
  field: {
    display: 'block',
    width: '100%'
  }
});

function InformationView() {
  const history = useHistory();

  const { mainContainer, form, field } = useStyles();

  const [nameInput, setNameInput] = useState('');
  const [dobInput, setDOBInput] = useState('');
  const [historyInput, setHistoryInput] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setInformation] = useInformation(null);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <div>
          <label htmlFor="name">Name*</label>
          <input className={field} type="text" name="name" id="name" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth*</label>
          <input className={field} type="date" name="dob" id="dob" value={dobInput} onChange={(event) => setDOBInput(event.target.value)} />
        </div>
        <div>
          <label htmlFor="history">Past Medical History*</label>
          <textarea className={field} name="history" id="history" value={historyInput} onChange={(event) => setHistoryInput(event.target.value)} />
        </div>
        {errorMessage
          ? (
            <ErrorMessage>
              <p>Error: {errorMessage}</p>
            </ErrorMessage>
          )
          : null
        }
        <input type="button" value="Submit" onClick={async (event) => {
          if (!nameInput || !dobInput || !historyInput) {
            setErrorMessage('All fields are required.');
            return;
          }

          event.preventDefault();
          const data = { name: nameInput, dob: dobInput, history: historyInput };
          setInformation(data);
          history.push('/');
        }} />
      </form>
    </div>
  );
}

export default InformationView;
