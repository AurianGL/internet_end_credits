import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { programsWrapper } from "./wrappers";
import { ReactPortal } from "../../utils/ReactPortal";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export const LoaderContainer: programsWrapper = ({
  children,
  name,
  isOpen,
  onCloseFolder,
  cle,
}) => {
  const history = useHistory();

  const { height } = useWindowDimensions();

  const deriveHeight = useMemo(() => `calc(${height}px - 30px) `, [height])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push(`/${cle}`);
    }, 4000);

    return () => clearTimeout(timer);
  }, [cle, history]);

  if (!isOpen) {
    return null;
  }



  return (
    <ReactPortal id='react-portal-modal-container'>
      <div className='absolute flex items-center justify-center w-screen overflow-hidden font-death '
        style={{ height: deriveHeight }}
      >
        <div className='text-center text-white p-4 bg-black border-white border shadow-lg shadow-red-700'>
          <div className='text-2xl'>{name}</div>
          <div className="p-2">
            {children}
          </div>
          <button onClick={onCloseFolder} className='min-w-[75px] min-h-[20px] border border-white border-t-1 border-r-3 border-b-3 border-l-1 no-underline p-1'>
            <div className='border-dotted border-2 border-white text-xl py-1 px-2'>CANCEL</div>
          </button>
        </div>
      </div>
    </ReactPortal>
  );
};
