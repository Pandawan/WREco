import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import FileUpload from 'components/fileUpload';
import ErrorMessage from 'components/errorMessage';
import { sendRequestToServer } from 'helpers/api';
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

function MainView() {
  const history = useHistory();

  const { mainContainer, form, field } = useStyles();

  const [symptomsInput, setSymptomsInput] = useState('');
  const [fileInput, setFileInput] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [information] = useInformation(null);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <h2>Create New Case
          {information && information.name
            ? <span> for {information.name}</span>
            : undefined
          }
        </h2>
        <InputField 
          name="Symptoms*"
          type="textarea"
          value={symptomsInput}
          onChange={(event) => setSymptomsInput(event.target.value)}
        />
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
        <Button label="Submit" onClick={async (event) => {
          event.preventDefault();

          if (!symptomsInput) {
            setErrorMessage('Symptoms field is required.');
            return;
          }

          const data = { name: information.name, symptoms: symptomsInput, files: fileInput };
          const response = await sendRequestToServer(data);
          history.push('/response', response);
        }}/>
      </form>
    </div>
  );
}

export default MainView;
