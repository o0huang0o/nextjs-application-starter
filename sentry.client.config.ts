import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: 1.0,
  
  // Set environment
  environment: process.env.NODE_ENV,
  
  // Enable automatic instrumentation for Next.js
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express(),
    new Sentry.Integrations.Prisma(),
  ],

  // Set sampling rates for transactions and errors
  sampleRate: 1.0,
  tracesSampler: (samplingContext) => {
    // Adjust sampling based on the operation
    switch (samplingContext.transactionContext.name) {
      case 'high-priority-operation':
        return 1.0;
      case 'low-priority-operation':
        return 0.1;
      default:
        return 0.5;
    }
  },
});
