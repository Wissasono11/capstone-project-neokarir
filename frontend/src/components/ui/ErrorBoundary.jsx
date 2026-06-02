import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none selection:bg-indigo-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10" />
          
          <div className="max-w-md w-full p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl flex flex-col items-center">
            <div className="p-4 bg-rose-500/10 rounded-full border border-rose-500/20 text-rose-500 mb-6 animate-pulse">
              <AlertCircle className="w-12 h-12" />
            </div>

            <h1 className="text-2xl font-bold text-slate-100 mb-2">Waduh! Terjadi Masalah</h1>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Aplikasi mengalami kesalahan yang tidak terduga. Kami telah mencatat log kesalahan ini untuk segera diperbaiki.
            </p>

            {this.state.error && (
              <div className="w-full text-left bg-slate-950/80 p-4 rounded-xl border border-slate-850 mb-6 overflow-auto max-h-32 text-xs font-mono text-rose-300">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                Muat Ulang Halaman
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm border border-slate-750 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
