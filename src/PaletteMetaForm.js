import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function PaletteMetaForm(props) {
	const { palettes, handleSubmit } = props;
	const [ newPaletteName, setNewPaletteName ] = useState('');
	const [ open, setOpen ] = useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	
	const handleChange = (evt) => {
		setNewPaletteName(evt.target.value);
	}
	
	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	});

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Choose Palette Name</DialogTitle>
			<ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your new Palette. Please make sure it's unique!
					</DialogContentText>
						<TextValidator 
							label='Palette Name' 
							name='newPaletteName'
							value={newPaletteName} 
							onChange={handleChange}
							fullWidth
							margin='normal'
							validators={['required','isPaletteNameUnique']}
							errorMessages={['Enter Palette Name', 'Palette Name is already in use']}
						/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button 
						variant='contained' 
						color='primary' 
						type='submit'
					>
						Save Palette
					</Button>
				</DialogActions>
			</ValidatorForm>
		</Dialog>
);
}

export default PaletteMetaForm;