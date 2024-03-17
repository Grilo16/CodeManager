import { FileExplorer, Main, MyProjects } from "./components";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { ProjectDashboard } from "./pages";
function App() {


  return (
    <Router>
      <nav style={{display: "flex", gap: "2rem"}}>
        <Link to={"/explorer"}>File Explorer</Link>
        <Link to={"/projects"}>Projects</Link>
        <Link to={"/project-dashboard"}>Project dashboard</Link>
      </nav>
      <Main>
        <Routes>
          <Route element={<FileExplorer/>} path={"/explorer"}/>
          <Route element={<MyProjects/>} path={"/projects"}/>
          <Route element={<ProjectDashboard/>} path={"/project-dashboard"}/>
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
