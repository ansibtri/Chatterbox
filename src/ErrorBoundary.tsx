import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    // update state so the next render will show the fallbacK UI
    console.log("getDerivedSateFromError: ", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error Caught: ", error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      // You can render any custom fallback UI
      return (
      <div className="flex flex-col h-full justify-center items-center">
      <img src="error.gif" />
      <h1 className="text-center text-4xl">Something went wrong!!!
            <a href="/">Go to Home</a>
      </h1>
    </div>);
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
