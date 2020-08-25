import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Twemoji } from 'react-emoji-render';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props){
	const { classes, paletteName, emoji, colors, handleClick, handleDelete, id } = props;
	
	const deletePalette = (e) => {
		e.stopPropagation();
		handleDelete(id);
	}
	
	const miniColorBoxes = colors.map(color => (
		<div 
			className={classes.miniColor}
			style={{backgroundColor: color.color}}
			key={color.name}
		/>
	));
	
	return(
		<div className={classes.root} onClick={handleClick}>
			<DeleteIcon 
				className={classes.deleteIcon} 
				style={{transition: 'all 0.3s ease-in-out'}}
				onClick={deletePalette}
			/>
			<div className={classes.colors}>
				{miniColorBoxes}
			</div>
			<h5 className={classes.title}>{paletteName} <Twemoji className={classes.emoji} text={`${emoji}`} /></h5>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);