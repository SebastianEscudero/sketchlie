'use client';

import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!;

export function AmplitudeAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Initializing Amplitude...');
      
      // Generate a unique user ID
      const userId = generateUniqueId();

      amplitude.init(API_KEY, userId, {
        defaultTracking: {
          sessions: true,
          pageViews: true,
          formInteractions: true,
          fileDownloads: true,
        },
      });

      const sessionReplayTracking = sessionReplayPlugin({
        sampleRate: 0.1, // 10% in production
      });

      amplitude.add(sessionReplayTracking);

      console.log('Amplitude initialized with session replay');
    }
  }, []);

  return null;
}

function generateUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}