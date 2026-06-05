import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Per-feature Error Boundary.
 * Wraps individual dashboard sections so one failing component
 * doesn't crash the entire page.
 * 
 * Props:
 * - featureName: string — human-readable section name for the error message
 * - fallback: React node — optional custom fallback UI
 * - className: string — optional wrapper className
 */
class FeatureErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `[FeatureErrorBoundary] Error in "${this.props.featureName || 'Unknown'}":`,
      error,
      errorInfo
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Allow custom fallback via props
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const featureName = this.props.featureName || 'Komponen';

      return (
        <div className={`bg-white rounded-2xl border border-slate-100 p-6 ${this.props.className || ''}`}>
          <div className="flex flex-col items-center justify-center text-center py-6">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-3">
              <AlertCircle className="w-5 h-5 text-rose-500" />
            </div>
            <h4 className="text-body-sm font-bold text-slate-700 mb-1">
              {featureName} gagal dimuat
            </h4>
            <p className="text-caption text-slate-400 mb-4 max-w-xs leading-relaxed">
              Terjadi masalah saat memuat {featureName.toLowerCase()}. Ini mungkin karena server AI sedang sibuk.
            </p>
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-caption transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default FeatureErrorBoundary;
