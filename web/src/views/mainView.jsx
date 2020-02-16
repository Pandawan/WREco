import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import FileUpload from 'components/fileUpload';
import ErrorMessage from 'components/errorMessage';
import { sendRequestToServer } from 'helpers/api';

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
    width: '100%',
  },
  symptomsField: {
    fontSize: '0.9em',
    minHeight: '10rem'
  }
});

function MainView() {
  const history = useHistory();

  const { mainContainer, form, field, symptomsField} = useStyles();

  const [symptomsInput, setSymptomsInput] = useState('');
  const [fileInput, setFileInput] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [information] = useInformation(null);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <h1>Create New Case
          {information && information.name
            ? <span> for {information.name}</span>
            : undefined
          }
        </h1>
        <div>
          <label htmlFor="symptoms">Symptoms*</label>
          <textarea className={field + ' ' + symptomsField} name="symptoms" id="symptoms" value={symptomsInput} onChange={(event) => setSymptomsInput(event.target.value)} />
        </div>
        <div>
          <label htmlFor="documents">Additional Photos or Documents</label>
          <FileUpload
            className={field}
            name="documents"
            id="documents"
            onDrop={(acceptedFiles) => {
              setFileInput(acceptedFiles);
            }}
          />
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
          event.preventDefault();

          if (!symptomsInput) {
            setErrorMessage('Symptoms field is required.');
            return;
          }

          const data = { symptoms: symptomsInput, files: fileInput };
          const response = await sendRequestToServer(data);
          history.push('/response', response);
        }} />
      </form>
    </div>
  );
}

export default MainView;
