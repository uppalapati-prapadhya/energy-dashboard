import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CostBenefit() {
  const [savings, setSavings] = useState(null);

  useEffect(() => {
    axios.get('/api/cost-benefit')
      .then(response => setSavings(response.data))
      .catch(err => console.error(err));
  }, []);

  if (!savings) return <div>Loading savings data...</div>;

  return (
    <div>
      <h2>Cost-Benefit Analysis</h2>
      <p>Last Month Savings: ${savings.lastMonth}</p>
      <p>This Month Savings: ${savings.thisMonth}</p>
      <p>Optimized Usage: {savings.optimizedUsage ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default CostBenefit;
