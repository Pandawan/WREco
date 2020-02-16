import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Houndify from 'houndify';
import { FaMicrophoneAlt } from "react-icons/fa";
import Button from 'components/button';
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
    '& > button': {
      flex: 1
    }
  },
  chatHistory: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  yourMessages: {
    justifyContent: 'flex-end'
  },
  messageContent: {
    width: 'fit-content',
    margin: '0.5rem',
    padding: '1rem',
    background: 'white',
    borderRadius: '1.5rem',
    color: '#333',

    '& p': {
      margin: 0,
    }
  },
});



function AssistantView() {
  const { mainContainer, form, icon, buttonGroup, chatHistory, messageGroup, yourMessages, messageContent } = useStyles();

  const [messages, setMessagesState] = useState([
    { isYours: true, content: 'Test Message 1' },
    { isYours: false, content: "Test Message 2" }
  ]);


  const [recorder, setRecorder] = useState(new Houndify.AudioRecorder());
  const [voiceRequest, setVoiceRequest] = useState(null);
  const [isRecording, setRecording] = useState(false);

  useEffect(() => {
    const rec = new Houndify.AudioRecorder();
    setRecorder(rec);

    console.log(rec);

    rec.on('start', () => {
      if (!rec.stream || rec.stream.state === 'closed') {
        messages.push({ isYours: false, content: 'Pleae enable Microphone permissions for this to work.' })
        setMessagesState(messages);
        return;
      }

      const vr = new Houndify.VoiceRequest({
        
      });
      setVoiceRequest(vr);


    });

    rec.on('error', (err) => {
      console.log(err);
      if (!rec.stream || rec.stream.state === 'closed') {
        messages.push({ isYours: false, content: 'Pleae enable Microphone permissions for this to work.' })
        setMessagesState(messages);
        return;
      }
    })

    // Cleanup function
    return () => {
      rec.stop();
    }
  }, []);


  /*
  useEffect(() => {
    requestForPermissions().then((stream) => {
      if (audioContext.state === 'closed') {
        messages.push({ isYours: false, content: 'Pleae enable Microphone permissions for this to work.'})
        setMessagesState(messages);
        console.error(error);
      }

      
    })

    async function perms() {
      try {
        const stream = await requestForPermissions();
      } catch (error) {
      }
    }
    perms();
  }, []);
  */

  return (
    <div className={mainContainer}>
      <form className={form}>
        <Title>Voice Assistant</Title>
        <div className={chatHistory}>
          {messages.map((message) => (
            <div key={message.content} className={messageGroup + ' ' + (message.isYours ? yourMessages : '')}>
              <div className={messageContent}>
                {message.isYours
                  ? (<p>You: <span>{message.content}</span></p>)
                  : (<p>Assistant: <span>{message.content}</span></p>)
                }
              </div>
            </div>
          ))}
        </div>
        <div className={buttonGroup}>
          <Button onClick={async (event) => {
            event.preventDefault();
            const recording = !isRecording;

            if (recording) {
              recorder.start();
              console.log('Started');
            }
            else {
              recorder.stop();
              console.log('Stopped');
            }

            setRecording(recording);
          }}>
            <FaMicrophoneAlt className={icon} />
            Talk With Assistant
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AssistantView;
