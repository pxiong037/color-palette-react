import React from 'react';
import { Twemoji } from 'react-emoji-render';

function PaletteFooter(props){
	const {paletteName, emoji} = props;
	return(
		<footer className='Palette-footer'>
			{paletteName}
			<Twemoji className='emoji' text={`${emoji}`} />
		</footer>
	);
}

export default PaletteFooter;