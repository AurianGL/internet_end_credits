import React from 'react';
import './App.scss';

import Welcome from './components/welcome';

function App() {
	// Then we set the value in the --vh custom property to the root of the document
  const height = `calc(${window.innerHeight * 0.01}px * 100)`
	return (
		<div
			className='App'
			style={{
				height: height
			}}>
			<Welcome />
		</div>
	);
}

export default App;
