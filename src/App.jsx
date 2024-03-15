import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { FileExplorer } from "./components";

function App() {
  const [greetMsg, setGreetMsg] = useState([]);
  const [name, setName] = useState("");



  return (
   <FileExplorer/>
  );
}

export default App;
