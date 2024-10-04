import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TariffDisplay() {
  const [tariffs, setTariffs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tariff data from the backend API
    axios.get('/api/tariffs')
      .then(response => {
        setTariffs(response.data);
      })
      .catch(err => {
        setError('Failed to fetch tariffs');
        console.error(err);
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!tariffs) return <div>Loading tariffs...</div>;

  return (
    <div>
      <h2>Current Tariffs</h2>
      <ul>
        <li>Off Peak: ${tariffs.off_peak?.rate}</li>
        <li>Mid Peak: ${tariffs.mid_peak?.rate}</li>
        <li>Peak: ${tariffs.peak?.rate}</li>
      </ul>
    </div>
  );
}

export default TariffDisplay;
