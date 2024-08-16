import { app } from 'electron';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import https from 'https';

const GA4_MEASUREMENT_ID = 'G-PYR18838TY';
const GA4_API_SECRET = import.meta.env.VITE_GA4_API_SECRET;

let clientId;

export const initAnalytics = () => {
  try {
    const filePath = path.join(app.getPath('userData'), 'client_id');
    try {
      clientId = fs.readFileSync(filePath, 'utf-8');
    } catch (readError) {
      clientId = uuidv4();
      fs.writeFileSync(filePath, clientId);
    }
  } catch (err) {
    console.error('Error initializing analytics', err);
  }
};

export const sendEvent = (name, params = {}) => {
  const payload = JSON.stringify({
    client_id: clientId,
    events: [{ name, params }],
  });

  const options = {
    hostname: 'www.google-analytics.com',
    path: `/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    if (res.statusCode !== 204) {
      console.error(`Event sending failed: ${name}. Status: ${res.statusCode}`);
    }
  });

  req.on('error', (error) => {
    console.error('Error sending event:', error);
  });

  req.write(payload);
  req.end();
};
