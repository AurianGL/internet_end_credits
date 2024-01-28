import React from "react";
import { Image, CloudinaryContext } from "cloudinary-react";

interface Props {
  imageId: string;
  openFolder?: () => void;
  name: string;
}

export const Icon = ({ imageId, openFolder, name }: Props) => {
  return (
    <button type="button" className="border-none bg-transparent text-white flex flex-col justify-center items-center" onClick={openFolder}>
           <div className="flex justify-center items-center">

      <CloudinaryContext cloudName="dav38qg9f">
          <Image publicId={`Internet_end_credit/icons/${imageId}`} width="32"/>
      </CloudinaryContext>
      </div>
      <p>{name}</p>
    </button>
  );
};
