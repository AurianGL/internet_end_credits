import { useEffect } from "react";

interface ConsoleProps {}

export const Console: React.FC<ConsoleProps> = () => {
  // const handleKeyUp = (event) => {
  //   console.log(event)
  // }

  return (
    <p onKeyUp={(event) => console.log(event)}>
      <span>{"> "}</span>
      <span className="animate-pulse bg-green-500">{"_"}</span>
    </p>
  );
};
