import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';

function App() {
  return (
	<Switch>
		<Route exact path='/' render={() => <h1>Palette List Goes Here</h1>} />
		<Route exact path='/palette/:id' render={() => <h1>Individual Palette List Goes Here</h1>}/>
	</Switch>
		// <div className="App">
		// <Palette palette={generatePalette(seedColors[0])}/>
		// </div>
  );
}

export default App;
