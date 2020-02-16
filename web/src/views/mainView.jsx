import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import FileUpload from 'components/fileUpload';
import ErrorMessage from 'components/errorMessage';
import { sendRequestToServer } from 'helpers/api';
import InputField from 'components/inputField';
import Button from 'components/button';
import Title from 'components/title';
import { defaultQueue } from 'helpers/defaultQueue';

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
  label: {
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  }
});

function MainView() {
  const history = useHistory();

  const { mainContainer, form, field, submitDiv, label } = useStyles();

  const [symptomsInput, setSymptomsInput] = useState('');
  const [fileInput, setFileInput] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [information] = useLocalStorage('information', null);
  const [queue] = useLocalStorage('queue', defaultQueue);


  return (
    <div className={mainContainer}>
      <form className={form}>
        <Title>
          Create New Case
            {information && information.name
            ? <span> for {information.name}</span>
            : undefined
          }
        </Title>
        <InputField
          name="Symptoms*"
          type="textarea"
          value={symptomsInput}
          onChange={(event) => setSymptomsInput(event.target.value)}
        />
        <div>
          <label className={label} htmlFor="documents">Additional Photos or Documents</label>
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
        <div className={submitDiv}>
          <Button rounded onClick={async (event) => {
            event.preventDefault();

            if (!symptomsInput) {
              setErrorMessage('Symptoms field is required.');
              return;
            }

            const data = { name: information.name, symptoms: symptomsInput, files: fileInput };
            const response = await sendRequestToServer(data);

            queue.push(response);
            writeStorage('queue', queue);

            history.push('/room', queue);
          }}>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default MainView;
