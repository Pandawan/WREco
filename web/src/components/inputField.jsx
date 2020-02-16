import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  label: {
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  },
  field: {
    display: 'block',
    width: '100%',
    borderRadius: '1.5rem',
    border: '1px solid #ccc',
    padding: '0 1rem',
    minHeight: '2.5rem',
    lineHeight: '1.15rem',
    fontSize: '0.9em',
    fontWeight: 'bold',
    minWidth: '15rem',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
    marginTop: '0.25rem',
    outline: 'none'
  },
  textAreaField: {
    padding: '1rem',
    fontSize: '0.9em',
    minHeight: '10rem',
    maxWidth: '100%'
  }
});

function InputField(props) {
  const { name, type, value, onChange, className } = props;

  const { label, field, textAreaField } = useStyles();

  const id = name.toLowerCase().replace(/[^\w]/, '');

  return (
    <div className={className}>
      <label className={label} htmlFor={id}>{name}</label>
      {
        type === 'textarea'
          ? <textarea className={field + ' ' + textAreaField} name={id} id={id} value={value} onChange={onChange} />
          : <input type={type} className={field} name={id} id={id} value={value} onChange={onChange} />
      }
    </div>
  );
}

export default InputField;