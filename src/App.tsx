import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Welcome from './winComponents/welcome';
import { DeRamp } from './pages/DeRamp';
import { Home } from './pages/Home';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/1995'>
						<div className='App'>
							<Welcome />
						</div>
					</Route>
					<Route path='/deramp'>
						<DeRamp />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
