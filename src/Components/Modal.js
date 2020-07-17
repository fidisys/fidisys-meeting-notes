import React, { useState } from "react";
import Draggable from "react-draggable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { ModalContext } from "../Contexts/ModalProvider";

const Modal = () => {
  const [value, setValue] = useState("");
  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, saveNotes }) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
          position={
            hasDraggedWindowPosition
              ? { x: windowPosition.x, y: windowPosition.y }
              : null
          }
        >
          <div
            id="modal"
            className="modal-window"
            style={{
              transform: windowPosition
            }}
          >
            <div className="modal-handle">
              <h1 className="meeting-title">Meeting Notes</h1>
              <div className="download-btn" onClick={saveNotes}>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>Download Meeting Notes</title>
                  <path d="M27.414 19.414l-10 10c-0.781 0.781-2.047 0.781-2.828 0l-10-10c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0l6.586 6.586v-19.172c0-1.105 0.895-2 2-2s2 0.895 2 2v19.172l6.586-6.586c0.39-0.39 0.902-0.586 1.414-0.586s1.024 0.195 1.414 0.586c0.781 0.781 0.781 2.047 0 2.828z"></path>
                </svg>
              </div>
            </div>
            <div className="modal-body" id="meeting-notes">
              <ReactQuill
                theme="bubble"
                value={value}
                onChange={setValue}
                placeholder="Click here and take a note..."
              />
            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
