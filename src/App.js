import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

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
		<Route render={({location}) => (
			<TransitionGroup>
				<CSSTransition key={location.key} classNames='fade' timeout={500}>
					<Switch location={location}>
						<Route 
							exact path='/palette/new'	
							render={(routeProps) => 
								<div className='page'>
									<NewPaletteForm 
										savePalette={savePalette} 
										palettes={palettes}
										{...routeProps} 
									/>
								</div>}
						/>
						<Route 
							exact path='/' 
							render={(routeProps) => 
								<div className='page'>
									<PaletteList 
										palettes={palettes} 
										deletePalette={deletePalette}
										{...routeProps}
									/>
								</div>} 
						/>
						<Route 
							exact path='/palette/:id' 
							render={(routeProps) => 
								<div className='page'>
									<Palette 
										palette={generatePalette(findPalette(routeProps.match.params.id))}
									/>
								</div>} 
						/>
						<Route 
							path='/palette/:paletteId/:colorId'
							render={(routeProps) => 
								<div className='page'>
									<SingleColorPalette 
										palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
										colorId={routeProps.match.params.colorId}
									/>
								</div>} 
						/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		)}/>
	);
}

export default App;
