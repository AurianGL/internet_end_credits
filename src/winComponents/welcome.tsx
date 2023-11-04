import React, { useContext, useMemo, useState } from "react";
import { InternetHasEnded } from "./internettHasEnded";
import { Paint } from "./paint";
import { FolderIcon } from "./folder_icon";
import { Menu } from "./menu";
import WindowsDrag from "./windowsDrag";
import { ConsoleContext, ProgramsContext } from "../context";
import { PROGRAMS } from "../constants/programs";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Art = () => {
  const { mode } = useContext(ConsoleContext);
  const { programs, setPrograms } = useContext(ProgramsContext);

  const { height } = useWindowDimensions();

  const deriveHeight = useMemo(
    () => `calc(${height * 0.01}px * 100)`,
    [height]
  );

  return (
    <div
      className='w-full text-left p-5 grow flex flex-col flex-start items-start'
      style={{ height: deriveHeight }}
    >
      <Paint />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-2'>
        {mode === "ANTHUME" && <FolderIcon name='Paintings' cle='painting' />}
        {mode === "POSTHUME" && <FolderIcon name='As Above' cle='crux' />}
        <FolderIcon name='Cult Dürer' cle='durer' />
        <FolderIcon name='Contact' cle='contact' />
        <FolderIcon name='Terminal' cle='terminal' />
        <FolderIcon name='Where is Home' cle='whereIsHome' />
        <FolderIcon name='WinAmp' cle='winAmp' />
      </div>
      {programs.map((program) => {
        const { name, PgrComponent, props, Wrapper } = PROGRAMS[program];
        return (
          <Wrapper
            cle={program}
            margin={name !== "Terminal"}
            name={name}
            onCloseFolder={() =>
              setPrograms(programs.filter((e) => e !== program))
            }
            key={name}
            isOpen={programs.includes(program)}
          >
            <PgrComponent {...props} />
          </Wrapper>
        );
      })}
      <InternetHasEnded />
    </div>
  );
};
interface Props {
  setType: (type: string) => void;
}

const WelcomeMessage = ({ setType }: Props) => {
  const { mode } = useContext(ConsoleContext);

  const { height } = useWindowDimensions();

  const deriveHeight = useMemo(
    () => `calc(${height * 0.01}px * 100)`,
    [height]
  );

  return (
    <div
      className='w-full text-left flex grow justify-center items-center'
      style={{ height: deriveHeight }}
    >
      <WindowsDrag>
        <div className='error-container windows' style={{ maxHeight: "100vw" }}>
          <div className='win-header'>
            <p className='win-title'>Welcome to AurianGL</p>
          </div>
          <div className='error-content'>
            <div className='error-message font-death text-lg'>
              As above, so below.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setType("art")}
                className={`win-button ${
                  mode === "ANTHUME" ? "text-black" : "text-white"
                }`}
              >
                <div
                  className={`border-dotted border-2 ${
                    mode === "ANTHUME" ? "border-black" : "border-white"
                  }`}
                >
                  1995
                </div>
              </button>
              <button
                onClick={() =>
                  (window.location.href = "https://www.spacejam.com/1996/")
                }
                className={`win-button ${
                  mode === "ANTHUME" ? "text-black" : "text-white"
                }`}
              >
                <div
                  className={`border-dotted border-2 ${
                    mode === "ANTHUME" ? "border-black" : "border-white"
                  }`}
                >
                  1996
                </div>
              </button>
            </div>
          </div>
        </div>
      </WindowsDrag>
    </div>
  );
};

export const Welcome = () => {
  const [type, setType] = useState("welcome");
  const { height } = useWindowDimensions();

  const deriveHeight = useMemo(
    () => `calc(${height * 0.01}px * 100)`,
    [height]
  );

  return (
    <div className='flex flex-col' style={{ height: deriveHeight }}>
      {type === "welcome" && <WelcomeMessage setType={setType} />}
      {type === "art" && <Art />}
      <Menu setType={setType} />
    </div>
  );
};
