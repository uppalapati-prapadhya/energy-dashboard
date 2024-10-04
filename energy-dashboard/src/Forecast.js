import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function Forecast() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios.get('/api/forecast')
      .then(response => setForecast(response.data.forecast))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: ['1h', '2h', '3h', '4h', '5h'],
    datasets: [{
      label: 'Forecasted Energy Consumption (kWh)',
      data: forecast,
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
    }]
  };

  return (
    <div>
      <h2>Energy Consumption Forecast</h2>
      <Line data={chartData} />
    </div>
  );
}

export default Forecast;
