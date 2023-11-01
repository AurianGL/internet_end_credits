import React, { useContext, useState, useRef, useMemo } from "react";
import { ConsoleContext, ProgramsContext } from "../../context";
import WindowsDrag from "../../winComponents/windowsDrag";
import { programsWrapper } from "./wrappers";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export const ProgramContainer: programsWrapper = ({
  cle,
  name,
  onCloseFolder,
  margin = true,
  children,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { mode } = useContext(ConsoleContext);
  const { currentProgram, setCurrentProgram } = useContext(ProgramsContext);
  const wrapperRef = useRef(null);
  
  const { height, width } = useWindowDimensions();
  const deriveHeight = useMemo(() => `calc(${height}px - 30px)`, [height])

  return (
    <WindowsDrag>
      <div
        onClick={() => setCurrentProgram(cle)}
        ref={wrapperRef}
        className={`${
          fullScreen ? "lg:w-full" : "lg:w-1/2"
        } absolute box-border top-0 left-0 flex sm:w-full flex-col windows ${
          currentProgram === cle ? "z-40" : "z-auto"
        }`}
        style={{ height: deriveHeight, ...(width < 768 && { width: width }) }}
      >
        <div className='win-header'>
          <p className='win-title'>{name}</p>
          <div className='draggable flex-grow'></div>
          <div className='flex items-center gap-1'>
            <button
              onClick={() => setFullScreen(!fullScreen)}
              className='win-close'
            >
              <div className='win-x '>□</div>
            </button>
            <button onClick={onCloseFolder} className='win-close'>
              <div className='win-x'>x</div>
            </button>
          </div>
        </div>
        <div className='flex grow flex-column'>
          <div
            className={`${mode === "ANTHUME" ? "bg-white" : "bg-black"} ${
              margin ? "generic-inner-content p-3" : "generic-inner-content p-0"
            }`}
          >
            {children}
          </div>

          <div style={{ height: "20px" }}></div>
        </div>
      </div>
    </WindowsDrag>
  );
};


