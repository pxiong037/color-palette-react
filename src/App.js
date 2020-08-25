import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
	const [palettes, setPalettes] = useState(savedPalettes || seedColors);
	
	useEffect(() => {
		window.localStorage.setItem(
			'palettes', 
			JSON.stringify(palettes)
		);
	}, [palettes]);
	
	const findPalette = (id) => {
		return palettes.find(function(palette){
			return palette.id === id;
		})
	}

	const savePalette = (newPalette) => {
		setPalettes([...palettes, newPalette]);
	}
	
	const deletePalette = (id) => {
		setPalettes(palettes.filter(p => p.id !== id));
	}
	
	return (
		<Switch>
			<Route 
				exact path='/palette/new'	
				render={(routeProps) => 
					<NewPaletteForm 
						savePalette={savePalette} 
						palettes={palettes}
						{...routeProps} 
					/>}
			/>
			<Route 
				exact path='/' 
				render={(routeProps) => 
					<PaletteList 
						palettes={palettes} 
						deletePalette={deletePalette}
						{...routeProps}
					/>} 
			/>
			<Route 
				exact path='/palette/:id' 
				render={(routeProps) => 
					<Palette 
						palette={generatePalette(findPalette(routeProps.match.params.id))}
					/>} 
			/>
			<Route 
				path='/palette/:paletteId/:colorId'
				render={(routeProps) => 
					<SingleColorPalette 
						palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
						colorId={routeProps.match.params.colorId}
					/>} 
			/>
		</Switch>
	);
}

export default App;
