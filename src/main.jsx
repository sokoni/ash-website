import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || "https://c5f2c1e7c8a3d00e29566049fa41f565@o4511854586036224.ingest.us.sentry.io/4511854592000000";

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  enableLogs: true,
  environment: import.meta.env.MODE || 'production',
  tracesSampleRate: 1.0,
  beforeSend(event) {
    if (event.request && event.request.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
    }
    return event;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
