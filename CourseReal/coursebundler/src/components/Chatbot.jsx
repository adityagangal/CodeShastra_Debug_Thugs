import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import {
  isbotOpen,
  BotOpen,
  llmInferenceSlice,
  selectInferenceResult,
  fetchLLMInference,
} from './redux/features/llmslice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import 'react-chat-widget/lib/styles.css';

import logo from '../assets/images/bot.avif';

function ChatBot() {
  const dispatch = useDispatch();

  useEffect(() => {
    addResponseMessage('Welcome to the Virtual Assistant!');
  }, []);

  const toggleBot = () => {
    dispatch(BotOpen.actions.togglebot());
  };

  const handleNewUserMessage = async newMessage => {
    const formData = new FormData();
    console.log(`New message incoming! ${newMessage}`);
    await axios
      .post('http://127.0.0.1:8000/chat', formData)
      .then(res => {
        console.log(res.data);
        addResponseMessage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        handleToggle={toggleBot}
        profileAvatar={BotOpen.isBotOpen ? logo : null}
        title="Virtual Assistant"
        subtitle="Your buddy in learning!
        "
      />
    </div>
  );
}

export default ChatBot;
