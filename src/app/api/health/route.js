import { NextResponse } from 'next/server';

export async function GET() {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'FlyRank Intern API',
    uptime: Math.floor(Math.random() * 10000), // Mock data
    database: 'connected',
    cache: 'healthy',
    memory: {
      used: Math.round(Math.random() * 100),
      total: 512,
    },
  };

  return NextResponse.json(status, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
