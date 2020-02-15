import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";

import FileUpload from 'components/fileUpload';
import { sendRequestToServer } from 'helpers/api';

const useStyles = createUseStyles({
  mainContainer: {
    margin: '0 auto',
    maxWidth: '50rem'
  },
  form: {
    '& > *': {
      margin: '0.5rem'
    }
  }
});

function MainView() {
  const history = useHistory();

  const { mainContainer, form } = useStyles();

  const [nameInput, setNameInput] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [fileInput, setFileInput] = useState([]);

  return (
    <div className={mainContainer}>
      <form className={form}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
        </div>
        <div>
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea name="symptoms" id="symptoms" value={symptomsInput} onChange={(event) => setSymptomsInput(event.target.value)} />
        </div>
        <FileUpload onDrop={(acceptedFiles) => {
          setFileInput(acceptedFiles);
        }} />
        <input type="button" value="Submit" onClick={async (event) => {
          event.preventDefault();
          const data = { name: nameInput, symptoms: symptomsInput, files: fileInput };
          const response = await sendRequestToServer(data);
          history.push('/response', response);
        }} />
      </form>
    </div>
  );
}

export default MainView;
