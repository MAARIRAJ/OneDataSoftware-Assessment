
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error occurred:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with the editor.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
