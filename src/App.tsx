import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PAGES } from "./constants/routes";
import {
  ConsoleProvider,
  LoadingProvider,
  ProgramsProvider,
  SecretProvider,
} from "./context";
import pages from "./pages";

function App() {
  return (
    <Router>
      <LoadingProvider>
        <ConsoleProvider>
          <SecretProvider>
            <ProgramsProvider>
              <Routes>
                {PAGES.map((page, index) => {
                  const PageComponent = pages[page.Component];
                  return (
                    <Route
                      path={page.url}
                      element={<PageComponent />}
                      key={page.name}
                    />
                  );
                })}
              </Routes>
            </ProgramsProvider>
          </SecretProvider>
        </ConsoleProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
