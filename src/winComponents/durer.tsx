import React from 'react';
import { Image, CloudinaryContext } from 'cloudinary-react';


const durerIds = [
  {id:'durer_sdqyov', name:'durer'},
  {id:'shave_fx8shc', name:'shave'},
]
interface ImagoProps {
	pic: string
}

const Imago = ({pic}: ImagoProps) => {
	return (
		<CloudinaryContext cloudName='dav38qg9f' >
			<div className='text-center gal-img'>
			<Image publicId={`Internet_end_credit/durer/${pic}`}/>
			</div>
		</CloudinaryContext>
	);
};

export const Durer = () => {
	return <div className='durer-imgs'>
    {durerIds.map(durerId => <Imago key={durerId.id} pic={durerId.id}/>)}
  </div>;
};

