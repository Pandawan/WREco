import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { readAsDataURL } from 'promise-file-reader';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: '0.5rem',
    border: '2px dashed #333',
    borderRadius: '0.5rem',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  text: {
    margin: '0.5rem 0'
  }
});

function FileUpload(props) {
  const { onDrop } = props;
  const { container, text } = useStyles();

  const handleDrop = useCallback(async (acceptedFiles) => {
    if(onDrop) {
      const base64ConversionTasks = acceptedFiles.map((file) => readAsDataURL(file));
      const base64Files = await Promise.all(base64ConversionTasks);
      onDrop(base64Files);
    }
  }, [onDrop]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: handleDrop});

  return (
    <div {...getRootProps()} className={container} >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className={text}>Drop the files here...</p> :
          <p className={text}>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUpload;