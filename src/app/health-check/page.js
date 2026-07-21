//
// H E A L T H - C H E C-K  P A G E
// This page fetches data from the API and displays system status
// Client Component for interactivity with server data fetching
// 

"use client";

import { useState, useEffect } from 'react';

export default function HealthCheckPage() {
  const [status, setStatus] = useState({
    timestamp: '',
    uptime: 0,
    memory: {},
    nodeVersion: '',
    environment: '',
    nextVersion: '16.2.10',
    responseTime: null,
    apiStatus: 'loading',
    apiError: null,
    apiData: null,
  });

  useEffect(() => {
    const fetchHealth = async () => {
      const startTime = Date.now();
      
      try {
        const response = await fetch('/api/health', {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const apiData = await response.json();
          setStatus(prev => ({
            ...prev,
            apiStatus: 'ok',
            apiData,
          }));
        } else {
          setStatus(prev => ({
            ...prev,
            apiStatus: 'error',
            apiError: `HTTP ${response.status}`,
          }));
        }
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          apiStatus: 'error',
          apiError: error.message,
        }));
      }
      
      const endTime = Date.now();
      setStatus(prev => ({
        ...prev,
        responseTime: `${endTime - startTime}ms`,
      }));
    };

    fetchHealth();
  }, []);

  // Set server-side data
  const serverInfo = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    nextVersion: '16.2.10',
    responseTime: status.responseTime || '--',
  };

  return (
    <div className="flex-1 bg-white dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Health Check
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
            System status and API connectivity test
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              System Info
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Status:</span>
                <span className="text-green-600 font-medium">✓ Healthy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Timestamp:</span>
                <span className="font-mono text-xs">{serverInfo.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Uptime:</span>
                <span className="font-mono">{Math.floor(serverInfo.uptime / 3600)}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Response Time:</span>
                <span className="font-mono font-semibold text-green-600">{serverInfo.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Node Version:</span>
                <span className="font-mono">{serverInfo.nodeVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Environment:</span>
                <span className="font-mono">{serverInfo.environment}</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Memory Usage
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Heap Total:</span>
                <span className="font-mono">{Math.round(serverInfo.memory.heapTotal / 1024 / 1024)} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Heap Used:</span>
                <span className="font-mono">{Math.round(serverInfo.memory.heapUsed / 1024 / 1024)} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">External:</span>
                <span className="font-mono">{Math.round(serverInfo.memory.external / 1024 / 1024)} MB</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              API Connection
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-black dark:text-zinc-50">
                  Health API Endpoint
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  /api/health
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${status.apiStatus === 'ok' ? 'bg-green-100 text-green-800' : status.apiStatus === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>                {status.apiStatus === 'ok' ? '✓ Connected' : status.apiStatus === 'error' ? '✗ Disconnected' : '⏳ Connecting'}
              </div>
            </div>
            {status.apiError && (
              <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                Error: {status.apiError}
              </div>
            )}
            {status.apiData && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm">
                <div className="font-medium text-green-800 dark:text-green-200">API Response:</div>
                <pre className="font-mono text-xs mt-1 overflow-x-auto">
                  {JSON.stringify(status.apiData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
