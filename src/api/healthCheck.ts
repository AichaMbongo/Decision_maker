import { supabase } from '../supabase/supabaseClient';

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  service: string;
  version: string;
  database: {
    connected: boolean;
    error?: string;
  };
  uptime: number;
}

export async function performHealthCheck(): Promise<HealthCheckResponse> {
  const startTime = Date.now();
  
  try {
    // Test database connection with a simple query
    const { data, error } = await supabase
      .from('criteria_categories')
      .select('id')
      .limit(1);

    const endTime = Date.now();
    const uptime = endTime - startTime;

    if (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        service: 'decision-maker-app',
        version: '1.0.0',
        database: {
          connected: false,
          error: error.message
        },
        uptime
      };
    }

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'decision-maker-app',
      version: '1.0.0',
      database: {
        connected: true
      },
      uptime
    };
  } catch (error: any) {
    const endTime = Date.now();
    const uptime = endTime - startTime;

    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'decision-maker-app',
      version: '1.0.0',
      database: {
        connected: false,
        error: error.message || 'Unknown error'
      },
      uptime
    };
  }
}

