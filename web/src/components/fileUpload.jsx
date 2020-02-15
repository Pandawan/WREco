import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { readAsDataURL } from 'promise-file-reader';

function FileUpload(props) {
  const { onDrop } = props;

  const handleDrop = useCallback(async (acceptedFiles) => {
    if(onDrop) {
      const base64ConversionTasks = acceptedFiles.map((file) => readAsDataURL(file));
      const base64Files = await Promise.all(base64ConversionTasks);
      onDrop(base64Files);
    }
  }, [onDrop]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: handleDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUpload;