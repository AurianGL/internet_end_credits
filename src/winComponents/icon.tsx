import {Image, CloudinaryContext} from 'cloudinary-react';

export const Icon = ({imageId, openFolder, name}: IconProp) => {
  return (
    <button
      className='flex border-none bg-transparent text-white flex-col align-start justify-center items-center'
      onClick={openFolder}
    >
      <CloudinaryContext cloudName="dav38qg9f">
          <Image publicId={`Internet_end_credit/icons/${imageId}`} width="32" />
      </CloudinaryContext>
      <p className="max-w-[80px] break-words">
        {name}
      </p>
    </button>
  )
}
  
type IconProp = {
  imageId: string,
  openFolder: () => void,
  name: string
}


          