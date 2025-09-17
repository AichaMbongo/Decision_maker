import React, { useEffect, useState } from 'react';
import { performHealthCheck, HealthCheckResponse } from '../api/healthCheck';

const HealthCheck: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await performHealthCheck();
        setHealthData(result);
      } catch (error) {
        console.error('Health check failed:', error);
        setHealthData({
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          service: 'decision-maker-app',
          version: '1.0.0',
          database: {
            connected: false,
            error: 'Health check failed'
          },
          uptime: 0
        });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Health Check</h2>
        <p>Checking system health...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>System Health Check</h2>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        overflow: 'auto'
      }}>
        {JSON.stringify(healthData, null, 2)}
      </pre>
    </div>
  );
};

export default HealthCheck;

