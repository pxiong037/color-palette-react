import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useStyles from './styles/ColorPickerFormStyles';

function ColorPickerForm(props){
	const { paletteIsFull, colors, addNewColor } = props;
	const [ currentColor, setColor ] = useState('teal');
	const [ newColorName, setColorName ] = useState('');
	
	const classes = useStyles();
	
	const updateCurrentColor = (newColor) => {
		const r = newColor.rgb.r;
		const g = newColor.rgb.g;
		const b = newColor.rgb.b;
		const a = newColor.rgb.a;
		const rgbaColor = `rgba(${r},${g},${b},${a})`;
		setColor(rgbaColor);
	}
	
	const handleChange = (evt) => {
		setColorName(evt.target.value);
	}
	
	const handleSubmit = () => {
		const newColor = {
			color: currentColor,
			name: newColorName
		}
		addNewColor(newColor);
		setColorName('');
	}
	
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
	});

	return(
		<div>
			<ChromePicker 
				color={currentColor}
				onChange={updateCurrentColor}
				className={classes.picker}
			/>
			<ValidatorForm onSubmit={handleSubmit}>
				<TextValidator 
					value={newColorName}
					className={classes.colorNameInput}
					name='newColorName'
					variant='filled'
					margin='normal'
					placeholder='Color Name'
					onChange={handleChange}
					validators={['required', 'isColorNameUnique', 'isColorUnique']}
					errorMessages={['Enter a color name','Color name must be unique','Color already used']}
				/>
				<Button 
					variant='contained' 
					color='primary'
					style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
					type='submit'
					disabled={paletteIsFull}
					className={classes.addColor}
				>
					{paletteIsFull ? 'palette full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default ColorPickerForm;