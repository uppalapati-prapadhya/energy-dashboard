const express = require('express');
const path = require('path');
const cors = require('cors');
const twilio = require('twilio');  // Optional: For SMS notifications

const app = express();

// Enable CORS and allow JSON request bodies
app.use(cors());
app.use(express.json());

// Twilio Configuration (Optional: Replace with your Twilio credentials)
//const accountSid = 'your_account_sid'; // Your Twilio Account SID
//const authToken = 'your_auth_token';   // Your Twilio Auth Token
//const client = new twilio(accountSid, authToken);

// Mock data for tariffs
const tariffs = {
  off_peak: { rate: 0.08, start: '00:00', end: '06:00' },
  mid_peak: { rate: 0.12, start: '06:00', end: '18:00' },
  peak: { rate: 0.20, start: '18:00', end: '22:00' }
};

// Mock data for energy consumption
const energyConsumptionData = [
  { time: '2024-10-01 00:00', consumption: 1.2 },
  { time: '2024-10-01 01:00', consumption: 1.1 },
  { time: '2024-10-01 02:00', consumption: 1.3 },
  // Add more data points as needed
];

// Mock data for solar energy management
const solarData = {
  production: 25.6,      // kWh produced
  batteryStorage: 12.4   // kWh stored in battery
};

// Mock data for forecasted consumption
const forecastedConsumption = [1.3, 1.4, 1.6, 1.7, 1.5];

// Scheduled devices
let scheduledDevices = [];

// Mock data for cost-benefit analysis
const savingsData = {
  lastMonth: 25.5,   // Savings in dollars
  thisMonth: 30.2,   // Savings in dollars
  optimizedUsage: true
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'energy-dashboard/build')));

// API route to get tariff data
app.get('/api/tariffs', (req, res) => {
  const{ message } = req.body;
  res.json({ message : 'Notification disabled for now.'});
});

// API route to get energy consumption data
app.get('/api/consumption', (req, res) => {
  res.json(energyConsumptionData);
});

// API route to schedule devices
app.post('/api/schedule', (req, res) => {
  const { device, time } = req.body;
  scheduledDevices.push({ device, time });
  res.json({ message: `${device} scheduled for ${time}` });
});

// API route to get solar data
app.get('/api/solar', (req, res) => {
  res.json(solarData);
});

// API route to get forecasted energy consumption
app.get('/api/forecast', (req, res) => {
  res.json({ forecast: forecastedConsumption });
});

// API route to send notifications (via SMS using Twilio)
app.post('/api/notify', (req, res) => {
  const { message } = req.body;

  // Send SMS notification (if using Twilio)
  client.messages.create({
    body: message,
    to: '+1234567890',  // Your recipient phone number
    from: '+0987654321' // Your Twilio phone number
  })
  .then((message) => res.json({ sid: message.sid }))
  .catch((err) => res.status(500).json(err));
});

// API route to get cost-benefit analysis
app.get('/api/cost-benefit', (req, res) => {
  res.json(savingsData);
});

// Catch-all route to serve React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'energy-dashboard/build', 'index.html'));
});

// Start the server on port 3000 or any specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

