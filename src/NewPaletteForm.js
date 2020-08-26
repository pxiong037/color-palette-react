import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import arrayMove from 'array-move';
import seedColors from './seedColors';

function NewPaletteForm(props){
	const { maxColors, palettes, savePalette, history } = props;
	
	const classes = useStyles();
  	const [open, setOpen] = useState(false);
  	const [colors, setColors] = useState(seedColors[0].colors);
	const paletteIsFull = colors.length >= maxColors;

  	const handleDrawerOpen = () => {
    	setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	
	const handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = colors;
		savePalette(newPalette);
		history.push('/');
	}
	
	const removeColor = (colorName) => {
		setColors(colors.filter(color => color.name !== colorName));
	}
	
	const onSortEnd = ({oldIndex, newIndex}) => {
		setColors(arrayMove(colors, oldIndex, newIndex));
	}
	
	const clearColors = () => {
		setColors([]);
	}
	
	const addNewColor = (newColor) => {
		setColors([...colors, newColor]);
	}
	
	const addRandomColor = () => {
		const allColors = palettes.map(p => p.colors).flat();
		let random = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[random];
		setColors([...colors, randomColor]);
	}
	
  	return (
		<div className={classes.root}>
			<PaletteFormNav open={open} classes={classes} palettes={palettes} handleSubmit={handleSubmit} handleDrawerOpen={handleDrawerOpen}/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
				  paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant='h4' gutterBottom>Design Your Palette</Typography>
					<div className={classes.buttons}>
						<Button 
							variant='contained' 
							color='secondary' 
							onClick={clearColors}
							className={classes.button}
						>
							Clear Palette
						</Button>
						<Button 
							variant='contained' 
							color='primary' 
							onClick={addRandomColor}
							disabled={paletteIsFull}
							className={classes.button}
						>
							Random Color
						</Button>
						<ColorPickerForm 
							paletteIsFull={paletteIsFull} 
							addNewColor={addNewColor}
							colors={colors}
						/>
					</div>
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
				  [classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList 
					colors={colors}
					removeColor={removeColor}
					axis='xy'
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>
		</div>
  	);
}

NewPaletteForm.defaultProps = {
	maxColors: 20
};

export default NewPaletteForm;