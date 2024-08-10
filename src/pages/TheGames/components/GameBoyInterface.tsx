interface GameBoyInterfaceProps {
  handleTouchStart: (key: string) => void;
  handleTouchEnd: (key: string) => void;
}

export const GameBoyInterface = ({
  handleTouchStart,
  handleTouchEnd,
}: GameBoyInterfaceProps) => {
  return (
    <div className="flex justify-around gap-4 w-full">
      <div className="flex justify-center mt-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-0">
          <div></div>
          <button
            className="select-none rounded-t-lg col-start-2 row-start-1 w-12 h-12  bg-transparent bg-gray-400 text-red-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("ArrowUp")}
            onTouchEnd={(e) => handleTouchEnd("ArrowUp")}
          >
            Up
          </button>
          <div></div>

          <button
            className="select-none rounded-l-lg col-start-1 row-start-2 w-12 h-12  bg-transparent  bg-gray-400 text-blue-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("ArrowLeft")}
            onTouchEnd={(e) => handleTouchEnd("ArrowLeft")}
          >
            Left
          </button>
          <div className="w-12 h-12  bg-transparent bg-gray-400 font-death text-lg" />
          <button
            className="select-none rounded-r-lg w-12 h-12  bg-transparent bg-gray-400 text-blue-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("ArrowRight")}
            onTouchEnd={(e) => handleTouchEnd("ArrowRight")}
          >
            Right
          </button>
          <button
            className="select-none rounded-b-lg col-start-2 row-start-3 w-12 h-12  bg-transparent  bg-gray-400 text-red-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("ArrowDown")}
            onTouchEnd={(e) => handleTouchEnd("ArrowDown")}
          >
            Down
          </button>
          <div></div>
        </div>
        <div className="ml-10 grid grid-cols-2 grid-rows-2 gap-0">
          <button
            className="select-none w-12 h-12 rounded-full bg-red-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("e")}
            onTouchEnd={(e) => handleTouchEnd("e")}
          >
            A
          </button>
          <div />
          <div />
          <button
            className="select-none w-12 h-12 rounded-full bg-blue-500 font-death text-lg"
            onTouchStart={(e) => handleTouchStart("q")}
            onTouchEnd={(e) => handleTouchEnd("q")}
          >
            B
          </button>
        </div>
      </div>
    </div>
  );
};
