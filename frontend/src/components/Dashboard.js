import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await axios.get('http://localhost:3001/admin/logs');
        setLogs(response.data.logs);
        setRiskScore(response.data.riskScore);
      } catch (error) {
        console.error('Failed to fetch logs', error);
      }
    }
    fetchLogs();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <p>Risk Score: {riskScore}</p>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.type}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;