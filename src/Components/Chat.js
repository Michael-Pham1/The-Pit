import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/api/messages/${id}`);
        setMessages(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/api/messages', {
        user: "userID", // Replace with actual user ID
        text,
        matchupId: id,
      });
      setMessages([...messages, response.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.creatorId}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
