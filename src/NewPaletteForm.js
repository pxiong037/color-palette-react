import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  	root: {
    	display: 'flex',
  	},
  	hide: {
    	display: 'none',
  	},
  	drawer: {
    	width: drawerWidth,
    	flexShrink: 0,
  	},
  	drawerPaper: {
    	width: drawerWidth,
		display: 'flex',
		alignItems: 'center'
  	},
  	drawerHeader: {
    	display: 'flex',
    	alignItems: 'center',
    	padding: theme.spacing(0, 1),
    	// necessary for content to be below app bar
    	...theme.mixins.toolbar,
    	justifyContent: 'flex-end',
  	},
  	content: {
    	flexGrow: 1,
		height: 'calc(100vh - 64px)',
    	padding: theme.spacing(3),
    	transition: theme.transitions.create('margin', {
      		easing: theme.transitions.easing.sharp,
      		duration: theme.transitions.duration.leavingScreen,
    	}),
    	marginLeft: -drawerWidth,
  	},
  	contentShift: {
    	transition: theme.transitions.create('margin', {
      		easing: theme.transitions.easing.easeOut,
      		duration: theme.transitions.duration.enteringScreen,
    	}),
    	marginLeft: 0,
  	},
	container: {
		width: "90%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	buttons: {
		width: "100%"
	},
	button: {
		width: "50%"
	}
}));

function NewPaletteForm(props){
	const { maxColors, palettes, savePalette, history } = props;
	
	const classes = useStyles();
  	const [open, setOpen] = useState(false);
  	const [colors, setColors] = useState(palettes[0].colors);
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
				/>
			</main>
		</div>
  	);
}

NewPaletteForm.defaultProps = {
	maxColors: 20
};

export default NewPaletteForm;