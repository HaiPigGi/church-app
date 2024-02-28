import React from 'react';

class ErrorBundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state untuk menampilkan pesan kesalahan di UI fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Anda dapat menambahkan log atau pelaporan kesalahan di sini
    console.error('Error caught by MyErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Tampilkan fallback UI jika terjadi kesalahan
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }
    // Render komponen children jika tidak ada kesalahan
    return this.props.children;
  }
}

export default ErrorBundary;
