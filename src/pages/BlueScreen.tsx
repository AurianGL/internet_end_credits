import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../winComponents/style/_index.scss'

interface Props { }

export const BlueScreen: React.FC<Props> = () => {
  const history = useHistory()

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Enter') {
        history.push('/1995')
      } else if (event.key !== 'Enter') {
        console.log('posthume mode')
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [history]);

  return (
    <div className='bg-death w-screen h-screen text-white text-xl  flex justify-center items-center'>
      <div className="w-full h-full absolute z-10 bg-scanline bg-[length:6px_6px] pointer-events-none"></div>
      <div className="w-full h-full absolute z-10 bg-vignette pointer-events-none"></div>
      <div className="px-2 py-3 flex justify-center items-center font-death">
        <div className="width-20">
          <div className="text-center">
            <h1 className='bg-windows-200 text-windows-700 px-4 m-4 text-lg inline-block'>Aurian GL</h1>
          </div>
          <p>Do androïds dream about electric sheep ?</p>
          <br/>
          <p>An error as occured</p>
          <p>Press enter to return to 1995,</p>
          <p>If you do this you will loose any unsaved information.</p>
          <p className="text-center">Press any key to continue <span className="animate-blink">_</span></p>
        </div>
      </div>
    </div>
  )
}
