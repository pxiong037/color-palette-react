import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function ColorPickerForm(props){
	const { paletteIsFull, colors, addNewColor } = props;
	const [currentColor, setColor] = useState('teal');
	const [newColorName, setColorName] = useState('');
	
	const updateCurrentColor = (newColor) => {
	  	setColor(newColor.hex);
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
			/>
			<ValidatorForm onSubmit={handleSubmit}>
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
					style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
					type='submit'
					disabled={paletteIsFull}
				>
					{paletteIsFull ? 'palette full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default ColorPickerForm;