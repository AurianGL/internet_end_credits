import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pages from "./pages";
import { PAGES } from "./constants/routes";
import {
  ConsoleProvider,
  LoadingProvider,
  ProgramsProvider,
  SecretProvider,
} from "./context";

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
                  return <Route path={page.url} element={<PageComponent />} key={index} />;
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
