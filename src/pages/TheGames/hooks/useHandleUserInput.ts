import { useState, useEffect } from "react";

export const useHandleUserInput = () => {
  const [userInput, setUserInput] = useState<string[]>([]);

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    setUserInput((prevUserInput) => {
      const updatedUserInput = [...prevUserInput];
      if (!updatedUserInput.includes(e.key)) {
        updatedUserInput.push(e.key);
      }
      return updatedUserInput;
    });
  };

  const handleOnKeyUp = (e: KeyboardEvent) => {
    setUserInput((prevUserInput) => {
      return prevUserInput.filter((key) => key !== e.key);
    });
  };

  const handleTouchStart = (key: string) => {
    setUserInput((prevUserInput) => {
      const updatedUserInput = [...prevUserInput];
      if (!updatedUserInput.includes(key)) {
        updatedUserInput.push(key);
      }
      return updatedUserInput;
    });
  };

  const handleTouchEnd = (key: string) => {
    setUserInput((prevUserInput) => {
      return prevUserInput.filter((k) => k !== key);
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("keyup", handleOnKeyUp);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("keyup", handleOnKeyUp);
    };
  }, []);

  return { userInput, handleTouchStart, handleTouchEnd };
};
