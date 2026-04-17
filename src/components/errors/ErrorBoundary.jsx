import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("KRAFT_CRASH_LOG:", error, errorInfo);
  }

  handleReset = () => {
    window.location.href = '/';
  };

  handleEmergencyClear = () => {
    if (window.confirm("This will clear your current project data to fix the crash. Are you sure?")) {
      localStorage.removeItem('kraft_saved_project');
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden font-sans">
          {/* Background Layer */}
          <div className="absolute inset-0 bg-space opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/80"></div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-3xl">
            <div className="w-24 h-24 mb-10 relative">
               <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500 animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.34c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
               </svg>
            </div>

            <h1 className="mb-4 text-5xl md:text-6xl font-black uppercase tracking-tighter">
              A New Update is Coming
            </h1>
            <p className="mb-12 text-lg text-gray-400 font-medium max-w-lg leading-relaxed">
              Or perhaps something just got lost in the void. KRAFT encountered an unexpected error, but don't worry—your project might still be recoverable.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
               <button 
                onClick={this.handleReset}
                className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform"
               >
                 Try Returning Home
               </button>
               
               <button 
                onClick={this.handleEmergencyClear}
                className="px-8 py-3 bg-red-500/10 border border-red-500/50 text-red-500 font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-500 hover:text-white transition-all"
               >
                 Emergency Rescue (Clear Cache)
               </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl text-left max-w-full overflow-auto">
                <p className="text-[10px] font-mono text-red-400">{this.state.error?.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
