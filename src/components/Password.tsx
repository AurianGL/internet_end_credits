import { useContext } from "react";
import { SecretContext } from "../context/SecretContext";

interface PasswordProps {}

export const Password: React.FC<PasswordProps> = () => {
  const { secret, removeSecret } = useContext<{
    secret: string[];
    removeSecret: (index: number) => void;
  }>(SecretContext);
  return (
    <div className="flex justify-start">
      {secret.map((letter, index) => (
        <p
          onClick={() => removeSecret(index)}
          className="m-1 font-mono font-black text-white bg-red-500 text-4xl"
        >
          {letter}
        </p>
      ))}
    </div>
  );
};
