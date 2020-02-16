import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from "react-router-dom";
import { FaPencilAlt, FaMicrophoneAlt, FaInfo } from "react-icons/fa";
import Card from 'components/card';
import Title from 'components/title';

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
  icon: {
    fontSize: '5rem',
    marginBottom: '0.5rem'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      flex: 1,
      '&:not(:first-child)': {
        marginLeft: '1rem'
      },
      '&:not(:last-child)': {
        marginRight: '1rem'
      }
    }
  }
});

function ChoiceView() {
  const history = useHistory();

  const { mainContainer, form, icon, buttonGroup } = useStyles();

  return (
    <div className={mainContainer}>
      <form className={form}>
        <Title>How Can We Help</Title>
        <div className={buttonGroup}>
          <Card onClick={async (event) => {
            event.preventDefault();
            history.push('/main');
          }}>
            <FaPencilAlt className={icon} />
            Manual Fill
          </Card>
          <Card onClick={async (event) => {
            event.preventDefault();
            history.push('/assistant');
          }}>
            <FaMicrophoneAlt className={icon} />
            Voice Assistant
          </Card>
        </div>
        <div className={buttonGroup}>

          <Card onClick={async (event) => {
            event.preventDefault();
            history.push('/information');
          }}>
            <FaInfo className={icon} />
            Personal Information
          </Card>
        </div>
      </form>
    </div>
  );
}

export default ChoiceView;
