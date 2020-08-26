import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import Page from './Page';
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
		<Route render={({location}) => (
			<TransitionGroup>
				<CSSTransition key={location.key} classNames='page' timeout={500}>
					<Switch location={location}>
						<Route 
							exact path='/palette/new'	
							render={(routeProps) => 
								<Page>
									<NewPaletteForm 
										savePalette={savePalette} 
										palettes={palettes}
										{...routeProps} 
									/>
								</Page>}
						/>
						<Route 
							exact path='/' 
							render={(routeProps) => 
								<Page>
									<PaletteList 
										palettes={palettes} 
										deletePalette={deletePalette}
										{...routeProps}
									/>
								</Page>} 
						/>
						<Route 
							exact path='/palette/:id' 
							render={(routeProps) => 
								<Page>
									<Palette 
										palette={generatePalette(findPalette(routeProps.match.params.id))}
									/>
								</Page>} 
						/>
						<Route 
							path='/palette/:paletteId/:colorId'
							render={(routeProps) => 
								<Page>
									<SingleColorPalette 
										palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
										colorId={routeProps.match.params.colorId}
									/>
								</Page>} 
						/>
						<Route render={() => <Redirect to='/'/>}/>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		)}/>
	);
}

export default App;
