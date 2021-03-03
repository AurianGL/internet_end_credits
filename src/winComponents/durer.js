import React from 'react';
import PropTypes from 'prop-types';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';


const durerIds = [
  {id:'durer_sdqyov', name:'durer'},
  {id:'shave_fx8shc', name:'shave'},
]


const Imago = (props) => {
  const {pic} = props
	return (
		<CloudinaryContext cloudName='dav38qg9f' style={{ textAlign: 'center' }}>
			<Image publicId={`Internet_end_credit/durer/${pic}`} className='gal-img'></Image>
		</CloudinaryContext>
	);
};

export const Durer = () => {
	return <div class='durer-imgs'>
    {durerIds.map(durerId => <Imago pic={durerId.id}/>)}
  </div>;
};

