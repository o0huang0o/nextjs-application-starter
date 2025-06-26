import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: 1.0,
  
  // Set environment
  environment: process.env.NODE_ENV,
  
  // Configure error handling
  beforeSend(event) {
    // Don't send errors for 404s
    if (event.request?.url?.includes('_next/static')) {
      return null;
    }
    return event;
  },

  // Set sampling rates
  sampleRate: 1.0,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
});
