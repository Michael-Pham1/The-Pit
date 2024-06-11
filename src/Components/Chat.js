import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('defaultUser'); // You should replace this with actual user data

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/api/messages/${id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling every 3 seconds
    return () => clearInterval(interval);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3100/api/messages', {
        user,
        text,
        matchupId: id,
      });
      setText('');
      // Fetch messages again to update the list
      const response = await axios.get(`http://localhost:3100/api/messages/${id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.creatorId}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
