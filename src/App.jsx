import { Route, Routes } from "react-router";
import "./App.css";
import Discover from "./component/Discover";
import EachDiscover from "./component/EachDiscover";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/discover/:type/:id" element={<EachDiscover />} />
    </Routes>
  );
}

export default App;
