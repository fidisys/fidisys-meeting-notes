import React from "react";
import htmlToText from "html-to-text";
import useWindowPosition from "../Hooks/useWindowPosition";

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();

  function saveNotes() {
    const domNode = document.querySelector("#meeting-notes");
    const toTextData = new Blob([htmlToText.fromString(domNode.innerHTML)], {
      type: "text/plain"
    });
    const blobUrl = window.URL.createObjectURL(toTextData);
    // Create a link element
    const link = document.createElement("a");
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = 'meetingNotes.txt';

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }

  return (
    <ModalContext.Provider
      value={{
        saveNotes,
        windowPosition
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
