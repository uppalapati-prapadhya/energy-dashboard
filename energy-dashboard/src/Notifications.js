import React, { useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [message, setMessage] = useState('');

  const sendNotification = () => {
    axios.post('/api/notify', { message })
      .then(response => alert('Notification sent!'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendNotification}>Send</button>
    </div>
  );
}

export default Notifications;
