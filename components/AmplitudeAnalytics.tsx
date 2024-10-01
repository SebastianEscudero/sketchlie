'use client';

import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!;

export function AmplitudeAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Initializing Amplitude...');
      
      amplitude.init(API_KEY, undefined, {
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