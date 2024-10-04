import React, { useState } from 'react';
import axios from 'axios';

function SmartSchedule() {
  const [device, setDevice] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/schedule', { device, time })
      .then(response => alert(response.data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Smart Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Device" value={device} onChange={(e) => setDevice(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default SmartSchedule;
