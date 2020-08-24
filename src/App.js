import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  	function findPalette(id){
	  	return palettes.find(function(palette){
			return palette.id === id;
		})
 	}
	
	const savePalette = (newPalette) => {
		setPalettes([...palettes, newPalette]);
  	}
	
	const [palettes, setPalettes] = useState(seedColors);
  
  return (
	<Switch>
		<Route 
			exact path='/palette/new'	
			render={(routeProps) => <NewPaletteForm savePalette={savePalette} {...routeProps} />}
		/>
		<Route 
			exact path='/' 
			render={(routeProps) => 
	  		<PaletteList 
				palettes={palettes} {...routeProps}
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
