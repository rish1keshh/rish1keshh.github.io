import React from 'react';
import { logErrorToService } from '../utils/secureLogging';

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the entire app.
 *
 * Security Benefits:
 * - Prevents exposure of stack traces and sensitive error information to users
 * - Provides graceful degradation of functionality
 * - Logs errors securely for monitoring without revealing internals
 * - Uses secure logging utilities to redact sensitive data
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details securely with sensitive data redaction
    // Logs are sent to monitoring service in production

    this.setState({
      error,
      errorInfo,
    });

    // Use secure logging utility that redacts sensitive data
    logErrorToService(error, errorInfo);

    // Log to console in development only
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI - does NOT expose error details
      return (
        <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
          <div className="max-w-md w-full glass p-8 rounded-lg text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-electric-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-text-slate mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-electric-blue text-navy-dark rounded-lg font-medium hover:bg-electric-blue/90 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-6 py-3 glass border border-electric-blue/50 text-electric-blue rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Try Again
              </button>
            </div>

            {/* Only show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-electric-blue hover:text-cyan-bright">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 p-4 bg-navy-light rounded text-xs font-mono text-text-slate overflow-auto max-h-64">
                  <div className="mb-2 text-red-400">
                    {this.state.error.toString()}
                  </div>
                  <div className="text-text-slate/60">
                    {this.state.errorInfo?.componentStack}
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
