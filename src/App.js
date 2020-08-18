import React from 'react';
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';

function App() {
  return (
    <div className="App">
		  {console.log(generatePalette(seedColors[4]))}
		<Palette {...seedColors[4]}/>
    </div>
  );
}

export default App;
