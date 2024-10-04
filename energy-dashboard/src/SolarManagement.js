import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SolarManagement() {
  const [solarData, setSolarData] = useState(null);

  useEffect(() => {
    axios.get('/api/solar')
      .then(response => setSolarData(response.data))
      .catch(err => console.error(err));
  }, []);

  if (!solarData) return <div>Loading solar data...</div>;

  return (
    <div>
      <h2>Solar Energy Management</h2>
      <p>Production: {solarData.production} kWh</p>
      <p>Battery Storage: {solarData.batteryStorage} kWh</p>
    </div>
  );
}

export default SolarManagement;
