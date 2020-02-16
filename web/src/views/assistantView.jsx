import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import Houndify from 'houndify';
import { FaMicrophoneAlt } from "react-icons/fa";
import Button from 'components/button';
import Title from 'components/title';
import { useHistory } from 'react-router-dom';
import useLocalStorage, { writeStorage } from '@rehooks/local-storage';
import { sendRequestToServer } from 'helpers/api';
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
  icon: {
    fontSize: '5rem',
    marginBottom: '0.5rem'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    '& > button': {
      flex: 1,
    }
  },
  recordingButton: {
    background: '#FD5959 !important'
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
    Longitude: -122.169716,
    TimeZone: "America/Los_Angeles"
  },
}

function AssistantView() {
  const [information] = useLocalStorage('information', null);
  const [queue] = useLocalStorage('queue', defaultQueue);

  const history = useHistory();

  const { mainContainer, form, icon, buttonGroup, chatHistory, messageGroup, yourMessages, messageContent, recordingButton } = useStyles();

  const [messages, setMessagesState] = useState([
    { isYours: false, content: 'Hi, use the microphone button to start talking.' },
    { isYours: false, content: 'What are your symptoms?' },
  ]);


  const [recorder, setRecorder] = useState(new Houndify.AudioRecorder());
  const [isRecording, setRecording] = useState(false);

  useEffect(() => {
    const rec = new Houndify.AudioRecorder();
    setRecorder(rec);

    setTimeout(() => {
      const su = new SpeechSynthesisUtterance('Hi, use the microphone button to start talking. What are your symptoms?');
      su.pitch = 1.2;
      su.rate = 1.2;

      // window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hi, use the microphone button to start talking.'));
      window.speechSynthesis.speak(su);
    }, 1000);

    let vr;
    let conversationState;
    let hasSpoken = false;
    let symptoms;

    console.log(rec);

    rec.on('start', () => {
      if (!rec.stream || rec.stream.state === 'closed') {
        setMessagesState((messages) => {
          messages.push({ isYours: false, content: 'Please enable Microphone permissions for this to work.' })
          return messages;
        });
        window.speechSynthesis.speak(new SpeechSynthesisUtterance('Please enable Microphone permissions for this to work.'));
        return;
      }

      vr = new Houndify.VoiceRequest({
        ...clientData,
        conversationState,
        sampleRate: 44100,
        onResponse: async (response, info) => {
          const userSpokenText = response.AllResults[0].WrittenResponse;
          setMessagesState((messages) => {
            return [...messages, 
              { isYours: true, content: userSpokenText }
            ]
          });
          if (hasSpoken === false) {
            setTimeout(() => {
              setMessagesState((messages) => {
                return [...messages,
                  { isYours: false, content: "Sorry to hear that, anything else you'd like to add?" }
                ];
              });
              window.speechSynthesis.speak(new SpeechSynthesisUtterance('Sorry to hear that, anything else you\'d like to add?'));
            }, 1000);
            symptoms = userSpokenText;
            hasSpoken = true;
            rec.stop();
          }
          else {
            setTimeout(() => {
              setMessagesState((messages) => {
                return [...messages, 
                  { isYours: false, content: "Okay, please hold..." }
                ];
              });
              window.speechSynthesis.speak(new SpeechSynthesisUtterance('Okay, please hold...'));
            }, 1000);

            const data = { name: information.name, symptoms };
            console.log(data);
            const response = await sendRequestToServer(data);
            console.log(response);
            setTimeout(async () => {
              queue.push(response);
              writeStorage('queue', queue);
              history.push('/room');
            }, 1000);
          }
        },
        onError: (err, info) => {
          console.log(err);
          setMessagesState((messages) => {
            return [...messages, 
              { isYours: false, content: "Oops, something went wrong... Please try again" }
            ]
          });
          window.speechSynthesis.speak(new SpeechSynthesisUtterance('Oops, something went wrong... Please try again'));
        }
      });
    });

    rec.on('data', (data) => {
      if (vr) {
        vr.write(data);
      }
    });

    rec.on('end', () => {
      vr.end();
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
          <Button className={(isRecording ? recordingButton : '')} onClick={async (event) => {
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
