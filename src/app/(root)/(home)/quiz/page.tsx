"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Page = () => {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Welcome to Gemini chat!' }]);
  const [input, setInput] = useState('');
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const data = {
        contents: [{ role: "user", parts: [{ text: input }] }],
        generationConfig: {
          response_mime_type: "application/json",
        },
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      const botMessage = { role: 'assistant', content: responseContent };

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error fetching response.' }]);
    }
  };

  const renderQuizQuestions = (content:any) => {
    try {
      const parsedContent = JSON.parse(content);
      if (parsedContent.quizQuestions) {
        return (
          <ul>
            {parsedContent.quizQuestions.map((question, index) => (
              <li key={index}>
                <strong>Q:</strong> {question.question} <br />
                <strong>A:</strong> {question.answer}
              </li>
            ))}
          </ul>
        );
      }
      return <p>{content}</p>;
    } catch (error) {
      return <p>{content}</p>;
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '1rem', border: '1px solid #eee', padding: '1rem', backgroundColor: '#333', color: 'white' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '0.5rem', textAlign: message.role === 'user' ? 'right' : 'left', color: 'white' }}>
            <strong>{message.role === 'user' ? 'You' : 'Gemini'}:</strong>
            {message.role === 'assistant' && index === messages.length - 1
              ? renderQuizQuestions(message.content)
              : <span>{message.content}</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#222', color: 'white' }}
        />
        <button onClick={sendMessage} style={{ padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#007bff', color: 'white' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
