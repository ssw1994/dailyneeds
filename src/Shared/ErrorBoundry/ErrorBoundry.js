import React from "react";
export default class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  static getDerivedStateFromError() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state?.hasError) {
      return (
        <>
          <div>OOP's Something Went Wrong...!</div>
        </>
      );
    }
    return this.state?.childrens;
  }
}
