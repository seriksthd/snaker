import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

export default function Modal({ children, handleIsOpenModal }) {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClick={handleIsOpenModal} />
      <GlobalStyle />
      <div className="modal" role="dialog" aria-modal="true">
        {children}
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
const GlobalStyle = createGlobalStyle`
      .modal {
        background-color: #FFFFFF;
        width: 400px;
        height: 100%;
        position: fixed;
        z-index: 2;
        top: 0px;
        right: 0px;
        transition: 0.3s ease-out;
      }
    `;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000067;
  z-index: 1;
`;
