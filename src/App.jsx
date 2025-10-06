import { Route, Routes } from "react-router";
import "./App.css";
import Discover from "./component/Discover";
import EachDiscover from "./component/EachDiscover";
import TvDetail from "./component/TvDetail";
import MovieDetail from "./component/MovieDetail";
import Search from "./component/Search";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/discover/:type/:id" element={<EachDiscover />} />
      <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
    </Routes>
  
  );
}

export default App;
