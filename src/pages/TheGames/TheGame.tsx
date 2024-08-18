import { BetterFrame } from "./components/BetterFrame";
import { MusicBox } from "./components/MusicBox";

export const TheGame = () => {
  return (
    <div className="flex bg-slate-900 h-screen items-center  justify-center gap-2 w-full text-white font-monospace">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="w-full text-center">ABYSS FORTRESS</h1>
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
      <MusicBox />
    </div>
  );
};
