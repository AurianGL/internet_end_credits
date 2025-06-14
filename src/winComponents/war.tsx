import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./errorMessage";

export const War = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-black">The war has started.</p>
        <button
          type="button"
          onClick={() => navigate("/war")}
          className="win-button text-black"
        >
          <div className="win-text-button">JOIN</div>
        </button>
      </div>
    </div>
  );
};