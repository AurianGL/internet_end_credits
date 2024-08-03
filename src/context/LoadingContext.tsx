import React, { createContext, useState } from "react";

interface LoadingContextProps {
  children: React.ReactNode;
}

type Loading = {
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
};

export const LoadingContext = createContext<Loading>({
  loading: false,
  setLoading: () => null,
});

export const LoadingProvider: React.FC<LoadingContextProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
