import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
	goToPallete(id){
		this.props.history.push(`/palette/${id}`);
	}
	
	render(){
		const { palettes, classes } = this.props;
		return(
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Color Palettes</h1>
					</nav>
					<div className={classes.palettes}>
						{palettes.map(palette => (
							<MiniPalette {...palette} handleClick={() => this.goToPallete(palette.id)}/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);