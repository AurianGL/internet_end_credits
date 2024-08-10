import { BetterFrame } from "./components/BetterFrame";

export const TheGame = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-slate-900 h-screen">
        <h1 className="text-cyan-300 font-death w-full text-center">
          ABYSS FORTRESS
        </h1>
        <div>
          <div
            className="absolute z-50 bg-scanline bg-[length:4px_4px] pointer-events-none"
            style={{ height: "400px", width: "400px" }}
          />
          <div
            className="absolute z-50 bg-vignette pointer-events-none"
            style={{ height: "400px", width: "400px" }}
          />
          <BetterFrame />
        </div>
      </div>
    </>
  );
};
