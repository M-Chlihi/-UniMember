import React from "react";
import Button from "../ui/Button";

class AppErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React rendering error:", error, errorInfo);
  }

  reset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold text-text-primary">
            Something went wrong
          </h1>

          <p className="mt-2 max-w-md text-text-secondary">
            The application encountered an unexpected error.
          </p>

          <div className="mt-6">
            <Button onClick={this.reset}>Try again</Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
