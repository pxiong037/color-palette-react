import React from 'react';
import { Twemoji } from 'react-emoji-render';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterStyles';

function PaletteFooter(props){
	const {paletteName, emoji, classes} = props;
	return(
		<footer className={classes.PaletteFooter}>
			{paletteName}
			<Twemoji className={classes.emoji} text={`${emoji}`} />
		</footer>
	);
}

export default withStyles(styles)(PaletteFooter);