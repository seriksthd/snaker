import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export default function Modal({
  children,
  className ,
}) {
  return ReactDOM.createPortal(
    <>
      <div className={className} >
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

