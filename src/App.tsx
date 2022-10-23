import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pages from "./pages";
import { PAGES } from "./constants/routes";
import {
  ConsoleProvider,
  LoadingProvider,
  SecretProvider,
} from "./context";

function App() {
	return (
		<Router>
		<LoadingProvider>
			<ConsoleProvider>
				<SecretProvider>
					<div>
						{PAGES.map((page, index) => {
							const PageComponent = pages[page.Component];
							return (
								<Switch key={index}>
									<Route exact path={page.url}>
										<PageComponent />
									</Route>
								</Switch>
							);
						})}
					</div>
				</SecretProvider>
			</ConsoleProvider>
		</LoadingProvider>
	</Router>
	);
}

export default App;
