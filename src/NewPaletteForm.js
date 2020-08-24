import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

function NewPaletteForm(props){
	const classes = useStyles();
  	const [open, setOpen] = useState(false);
  	const [currentColor, setColor] = useState('teal');
  	const [colors, setColors] = useState([]);
	const [newColorName, setColorName] = useState('');
	const [newPaletteName, setPaletteName] = useState('');
	
	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			colors.every(
				({ color }) => color !== currentColor
			)
		);
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	});

  	const handleDrawerOpen = () => {
    	setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const updateCurrentColor = (newColor) => {
	  	setColor(newColor.hex);
	}
	
	const addNewColor = () => {
		const newColor = {
			color: currentColor,
			name: newColorName
		}
		setColors([...colors, newColor]);
		setColorName('');
	}
	
	const handleChange = (evt) => {
		if(evt.target.name === 'newColorName'){
			setColorName(evt.target.value);
		}
		
		if(evt.target.name === 'newPaletteName'){
			setPaletteName(evt.target.value);
		}
	}
	
	const handleSubmit = () => {
		let newName = newPaletteName;
		const newPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, '-'),
			colors: colors
		}
		props.savePalette(newPalette);
		props.history.push('/');
	}
	
	const removeColor = (colorName) => {
		setColors(colors.filter(color => color.name !== colorName));
	}
	
	const onSortEnd = ({oldIndex, newIndex}) => {
		setColors(arrayMove(colors, oldIndex, newIndex));
	}
	
  	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
			position="fixed"
			color='default'
			className={clsx(classes.appBar, {
			  [classes.appBarShift]: open,
			})}
			>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography 
					variant="h6" 
					noWrap
				>
					Persistent drawer
				</Typography>
				<ValidatorForm onSubmit={handleSubmit}>
					<TextValidator 
						label='Palette Name' 
						name='newPaletteName'
						value={newPaletteName} 
						onChange={handleChange}
						validators={['required','isPaletteNameUnique']}
						errorMessages={['Enter Palette Name', 'Palette Name is already in use']}
					/>
					<Button 
						variant='contained' 
						color='primary' 
						type='submit'
					>
						Save Palette
					</Button>
				</ValidatorForm>
			</Toolbar>
			</AppBar>
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
				<Typography variant='h4'>Design Your Palette</Typography>
				<div>
					<Button variant='contained' color='secondary'>Clear Palette</Button>
					<Button variant='contained' color='primary'>Random Color</Button>
				</div>
				<ChromePicker 
					color={currentColor}
					onChange={updateCurrentColor}
				/>
				<ValidatorForm onSubmit={addNewColor}>
					<TextValidator 
						value={newColorName}
						name='newColorName'
						onChange={handleChange}
						validators={['required', 'isColorNameUnique', 'isColorUnique']}
						errorMessages={['Enter a color name','Color name must be unique','Color already used']}
					/>
					<Button 
						variant='contained' 
						color='primary'
						style={{backgroundColor: currentColor}}
						type='submit'
					>
						Add Color
					</Button>
				</ValidatorForm>
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

export default NewPaletteForm;