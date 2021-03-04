import React, { createContext, useState } from "react";

interface SecretContextProps {}

export const SecretContext: React.Context<any> = createContext(undefined);

export const SecretProvider: React.FC<SecretContextProps> = ({ children }) => {
  const [secret, setSecret] = useState<string[]>([]);

  const addSecret = (letter: string) => {
    if (letter === ' ') return
    const newSecret = [...secret, letter];
    setSecret(newSecret);
  };

  const resetSecret = (letter: string) => {
    setSecret([]);
  };

  const removeSecret = (index: number) => {
    const newSecret = secret.filter((_, i) => i !== index);
    setSecret(newSecret);
  };

  return (
    <SecretContext.Provider
      value={{ secret, addSecret, resetSecret, removeSecret }}
    >
      {children}
    </SecretContext.Provider>
  );
};
