import { Nav } from "./components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { appRoutesData } from "./utils";

function App() {
  const routes = appRoutesData.map((route, index)=> <Route key={index} {...route}/>)

  return (
    <Router>
        <Nav/>
        <Routes>
          {routes}
        </Routes>
    </Router>
  );
}

export default App;
