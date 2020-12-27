import React from 'react';
import PropTypes from 'prop-types'
import {Image, CloudinaryContext} from 'cloudinary-react';

export default function Icon ({imageId, openFolder, name}){
  return (
    <button
      className='win-folder'
      onClick={openFolder}
    >
      <CloudinaryContext cloudName="dav38qg9f">
        <div>
          <Image publicId={`Internet_end_credit/icons/${imageId}`} width="32" />
        </div>
      </CloudinaryContext>
      <p>{name}</p>
    </button>
  );
}

Icon.propTypes = {
  imageId: PropTypes.string.isRequired,
  openFolder: PropTypes.func,
  name: PropTypes.string.isRequired
}


          