import React, { createRef } from "react";
export const ModalBox = (WrappedComponent) => {
  const ref = createRef();
  return class ModelBoxContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    closeDialog() {
      ref?.current?.close();
    }

    render() {
      return (
        <dialog ref={ref}>
          <button
            onClick={() => {
              this.closeDialog();
              this.props?.closeDialog();
            }}
            style={{ position: "absolute", top: "11px", right: "-8px" }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <WrappedComponent {...this.props} dialogRef={ref} />
        </dialog>
      );
    }
  };
};
