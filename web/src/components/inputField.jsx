import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  field: {
    display: 'block',
    width: '100%',
    borderRadius: '0.25em',
    border: '1px solid #ccc',
    padding: '0 0.25rem',
    minHeight: '1.5rem',
    lineHeight: '1.15rem',
    fontSize: '0.9em',
    minWidth: '15rem',
    boxSizing: 'border-box' 
  },
  textAreaField: {
    fontSize: '0.9em',
    minHeight: '10rem',
    maxWidth: '100%',
  }
});

function InputField(props) {
  const { name, type, value, onChange, className } = props;

  const { field, textAreaField } = useStyles();

  const id = name.toLowerCase().replace(/[^\w]/, '');

  return (
    <div className={className}>
      <label htmlFor={id}>{name}</label>
      {
        type === 'textarea'
          ? <textarea className={field + ' ' + textAreaField} name={id} id={id} value={value} onChange={onChange} />
          : <input type={type} className={field} name={id} id={id} value={value} onChange={onChange} />
      }
    </div>
  );
}

export default InputField;