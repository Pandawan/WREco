import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import createPersistedState from 'use-persisted-state';

import FileUpload from 'components/fileUpload';
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
    width: '100%'
  }
});

function MainView() {
  const history = useHistory();


  const { mainContainer, form, field } = useStyles();

  const [symptomsInput, setSymptomsInput] = useState('');
  const [fileInput, setFileInput] = useState([]);
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
          <label htmlFor="symptoms">Symptoms</label>
          <textarea className={field} name="symptoms" id="symptoms" value={symptomsInput} onChange={(event) => setSymptomsInput(event.target.value)} />
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
        <input type="button" value="Submit" onClick={async (event) => {
          event.preventDefault();
          const data = { symptoms: symptomsInput, files: fileInput };
          const response = await sendRequestToServer(data);
          history.push('/response', response);
        }} />
      </form>
    </div>
  );
}

export default MainView;
