import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center space-y-5 border border-[#30BBFF]/20 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Something went wrong</h3>
              <p className="text-xs text-[#9E9E9E]">
                An unhandled interface error occurred. Please refresh the page to restore your application session.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#30BBFF] to-[#FF2ED4] text-[#0F0F0F] font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
