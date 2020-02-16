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

const clientData = {
  clientId: 'a4ujsPBbf5PdBQKXd1Jvbg==',
  clientKey: 'XAYhFwblvGtlLd3r77DBuCwpNQpSQw-BZLKrKHV7IcNA1RqW8vZ0A9nUXRO1IaXwUE7ogDrnIaspQQIMd966tQ==',
  requestInfo: {
    UserID: "test_user",
    Latitude: 37.427475, 
    Longitude: -122.169716
  },
}

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

    let vr;
    let conversationState;

    console.log(rec);

    rec.on('start', () => {
      if (!rec.stream || rec.stream.state === 'closed') {
        setMessagesState((messages) => {
          messages.push({ isYours: false, content: 'Pleae enable Microphone permissions for this to work.' })
          return messages;
        });
        return;
      }

      vr = new Houndify.VoiceRequest({
        ...clientData,
        conversationState,
        sampleRate: 16000,
        onResponse: (response, info) => {
          setMessagesState((messages) => {
            messages.push({ isYours: false, content: response.AllResults[0].WrittenResponse });
            return messages;
          });
          console.log(response, info);
          // userConversationState = response.AllResults[0].ConversationState;
        },
        onError: (err, info) => {
          console.log(err);
        }
      });
      setVoiceRequest(vr);
      console.log(vr);
    });

    rec.on('data', (data) => {
      if (vr) {
        vr.write(data);
      }
    });

    rec.on('error', (err) => {
      console.log(err);
      if (!rec.stream || rec.stream.state === 'closed') {
        setMessagesState((messages) => {
          messages.push({ isYours: false, content: 'Pleae enable Microphone permissions for this to work.' })
          return messages;
        });
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
