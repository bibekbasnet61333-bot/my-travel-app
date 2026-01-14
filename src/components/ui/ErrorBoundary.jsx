import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../../utils/dateUtils';

class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: `eb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    fallbackMessage: PropTypes.string,
    onRetry: PropTypes.func,
    onError: PropTypes.func,
    level: PropTypes.oneOf(['page', 'section']),
    sectionName: PropTypes.string,
  };

  static defaultProps = {
    fallbackMessage: 'Something went wrong. Please try again.',
    level: 'page',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    if (process.env.NODE_ENV === 'development') {
      console.group('[ErrorBoundary] Error Caught');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo?.componentStack);
      console.error('Error ID:', this.state.errorId);
      console.groupEnd();
    }

    this.reportError(error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo, this.state.errorId);
    }
  }

  reportError = (error, errorInfo) => {
    const errorData = {
      errorId: this.state.errorId,
      errorMessage: error?.message || 'Unknown error',
      errorName: error?.name || 'Error',
      errorStack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: formatDateTime(new Date()),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
    };

    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorData);
    }
  };

  sendToErrorService = async (errorData) => {
    const ERROR_REPORT_URL = import.meta.env?.VITE_ERROR_REPORT_URL;

    if (ERROR_REPORT_URL) {
      try {
        await fetch(ERROR_REPORT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData),
        });
      } catch (e) {
        console.error('[ErrorBoundary] Failed to send error report:', e);
      }
    }

    const errors = JSON.parse(localStorage.getItem('appErrors') || '[]');
    errors.push(errorData);
    if (errors.length > 10) errors.shift();
    localStorage.setItem('appErrors', JSON.stringify(errors));
  };

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: prevState.retryCount + 1,
    }));

    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    const { hasError, error, errorInfo, errorId, retryCount } = this.state;
    const { children, fallbackMessage, level, sectionName } = this.props;
    const isSection = level === 'section';

    if (hasError) {
      const canRetry = retryCount < 3;

      // Section-level fallback (simple)
      if (isSection) {
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {sectionName ? `Unable to load: ${sectionName}` : 'Unable to load content'}
              </h3>
              <p className="text-sm text-red-600 mb-4">{fallbackMessage}</p>
              <p className="text-xs text-gray-500 mb-4">
                Error: {error?.message || 'Unknown error'}
              </p>
              <button
                onClick={this.handleRetry}
                disabled={!canRetry}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:from-slate-400 disabled:to-slate-400"
              >
                {canRetry ? 'Try Again' : 'Refresh Page'}
              </button>
            </div>
          </div>
        );
      }

      // Page-level fallback (rich UI)
      return (
        <div
          role="alert"
          aria-live="polite"
          className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8"
        >
          <div className="text-center max-w-md mx-auto">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-20"></div>
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50 border border-blue-100">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-3">Adventure Paused</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">{fallbackMessage}</p>

            {process.env.NODE_ENV === 'production' && errorId && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Ref: {errorId}</span>
              </div>
            )}

            {process.env.NODE_ENV === 'development' && error && (
              <details className="text-left bg-white/80 rounded-xl p-4 mb-5 text-sm text-slate-700 overflow-auto max-h-48 border border-blue-100">
                <summary className="font-semibold text-blue-600 cursor-pointer hover:text-blue-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Technical Details
                </summary>
                <div className="pl-6 space-y-2">
                  <p className="text-red-600 font-mono text-xs bg-red-50 p-2 rounded-lg">{error?.message || 'Unknown error'}</p>
                  {errorInfo?.componentStack && (
                    <pre className="whitespace-pre-wrap break-all text-xs text-slate-500 bg-slate-100 p-3 rounded-lg mt-2">{errorInfo.componentStack}</pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                disabled={!canRetry}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 transition-all duration-300 font-semibold text-sm shadow-lg shadow-blue-200 hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {canRetry ? 'Try Again' : 'Refresh Page'}
              </button>
              <a href="/" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-semibold text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </a>
            </div>

            {retryCount > 0 && <p className="text-xs text-slate-400 mt-4">{retryCount}/3 attempts made</p>}
            <p className="text-xs text-slate-400 mt-4">Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a></p>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

export function withErrorBoundary(WrappedComponent, options = {}) {
  return function WithErrorBoundary(props) {
    return <ErrorBoundary {...options}><WrappedComponent {...props} /></ErrorBoundary>;
  };
}

