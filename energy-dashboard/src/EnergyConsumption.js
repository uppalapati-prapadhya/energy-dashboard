import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function EnergyConsumption() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/consumption')
      .then(response => setData(response.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: data.map(entry => entry.time),
    datasets: [{
      label: 'Energy Consumption (kWh)',
      data: data.map(entry => entry.consumption),
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
    }]
  };

  return (
    <div>
      <h2>Energy Consumption Analytics</h2>
      <Line data={chartData} />
    </div>
  );
}

export default EnergyConsumption;
