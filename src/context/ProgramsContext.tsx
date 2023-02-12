import React, { createContext, useState } from "react";

interface ProgramsContextProps {}

type Programs = {
  programs: string[];
  setPrograms: React.Dispatch<string[]>;
  currentProgram: string;
  setCurrentProgram: React.Dispatch<string>;
};

export const ProgramsContext = createContext<Programs>({
  programs: [],
  setPrograms: () => null,
  currentProgram: '',
  setCurrentProgram: () => null,
});

export const ProgramsProvider: React.FC<ProgramsContextProps> = ({
  children,
}) => {
  const [programs, setPrograms] = useState<string[]>([]);
  const [currentProgram, setCurrentProgram] = useState<string>('')

  return (
    <ProgramsContext.Provider value={{ programs, setPrograms, currentProgram, setCurrentProgram }}>
      {children}
    </ProgramsContext.Provider>
  );
};
