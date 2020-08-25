import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Twemoji } from 'react-emoji-render';

function PaletteMetaForm(props) {
	const { palettes, handleSubmit, hideForm } = props;
	const [ newPaletteName, setNewPaletteName ] = useState('');
	const [ stage, setStage ] = useState('form');
	const [ emoji, setEmoji ] = useState('');
	
	const handleChange = (evt) => {
		setNewPaletteName(evt.target.value);
	}
	
	const showEmojiPicker = () => {
		setStage('emoji');
	}
	
	const showForm = () => {
		setStage('form');
	}
	
	const savePalette = () => {
		const newPalette = {
			paletteName: newPaletteName,
			emoji: emoji.native
		}
		handleSubmit(newPalette);
	}
	
	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	});

	return (
		<div>
			<Dialog open={stage === 'emoji'}  onClose={hideForm}>
				<DialogTitle id="form-dialog-title">Choose Palette Emoji {emoji !== '' && <Twemoji text={`${emoji.native}`} />}</DialogTitle>
				<Picker 
					set='twitter' 
					onSelect={(emojiSelected) => setEmoji(emojiSelected)}
					title='Pick a Palette Emoji'
				/>
				<DialogActions>
					<Button onClick={showForm} color="primary">
						Back
					</Button>
					<Button 
						variant='contained' 
						color='primary' 
						onClick={savePalette}
						disabled={emoji === ''}
					>
						Save Palette
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog 
				open={stage === 'form'} 
				onClose={hideForm} 
				aria-labelledby="form-dialog-title"
				keepMounted
			>
				<DialogTitle id="form-dialog-title">Choose Palette Name</DialogTitle>
				<ValidatorForm onSubmit={showEmojiPicker}>
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
						<Button onClick={hideForm} color="primary">
							Cancel
						</Button>
						<Button 
							variant='contained' 
							color='primary' 
							type='submit'
						>
							Pick Emoji
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
);
}

export default PaletteMetaForm;