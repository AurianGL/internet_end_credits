import { useContext, useRef } from "react";
import { ProgramsContext } from "../../context";
import { programsWrapper } from "./wrappers";
import WindowsDrag from "../../winComponents/windowsDrag";

export const NeutralContainer: programsWrapper = ({ children, cle }) => {
  const { currentProgram, setCurrentProgram } = useContext(ProgramsContext);
  const wrapperRef = useRef(null);
  return (
    <WindowsDrag>
      <div
        onClick={() => setCurrentProgram(cle)}
        ref={wrapperRef}
        className={`absolute ${currentProgram === cle ? "z-40" : "z-auto"}`}
      >
        {children}
      </div>
    </WindowsDrag>
  );
};
