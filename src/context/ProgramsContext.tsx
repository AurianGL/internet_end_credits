import React, { createContext, useState } from "react";

interface ProgramsContextProps {}

type Programs = {
  programs: string[];
  setPrograms: React.Dispatch<string[]>;
};

export const ProgramsContext = createContext<Programs>({
  programs: [],
  setPrograms: () => null,
});

export const ProgramsProvider: React.FC<ProgramsContextProps> = ({
  children,
}) => {
  const [programs, setPrograms] = useState<string[]>([]);

  return (
    <ProgramsContext.Provider value={{ programs, setPrograms }}>
      {children}
    </ProgramsContext.Provider>
  );
};
