import React, { createContext, useEffect, useState } from "react";
import { PROGRAMS } from "../constants/programs";
import { useLocation } from "react-router-dom";

interface ProgramsContextProps {}

export type Cle = keyof typeof PROGRAMS

type Programs = {
  programs: Cle[];
  setPrograms: React.Dispatch<Cle[]>;
  currentProgram: Cle | undefined;
  setCurrentProgram: React.Dispatch<Cle>;
};

export const ProgramsContext = createContext<Programs>({
  programs: [],
  setPrograms: () => null,
  currentProgram: undefined,
  setCurrentProgram: () => null,
});

export const ProgramsProvider: React.FC<ProgramsContextProps> = ({
  children,
}) => {
  const [programs, setPrograms] = useState<Cle[]>([]);
  const [currentProgram, setCurrentProgram] = useState<Cle>()
  const location = useLocation();

  useEffect(() => {
    setPrograms([])
    setCurrentProgram(undefined)
  }, [location])

  return (
    <ProgramsContext.Provider value={{ programs, setPrograms, currentProgram, setCurrentProgram }}>
      {children}
    </ProgramsContext.Provider>
  )
}
