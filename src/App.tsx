import "./assets/scss/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/Container";
import Films from "./pages/Films";
import People from "./pages/People";
import FilmDetailPage from "./pages/FilmDetailPage";
import PeopleDetailPage from "./pages/PeopleDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Planets from "./pages/Planets";
import PlanetDetailPage from "./pages/PlanetDetailPage";
import Species from "./pages/Species";
import SpeciesDetailPage from "./pages/SpeciesDetailPage";
import Starships from "./pages/Starships";
import StarshipsDetailPage from "./pages/StarshipsDetailPage";

function App() {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/films" element={<Films />}></Route>
          <Route path="/people" element={<People />}></Route>
          <Route path="/planets" element={<Planets />}></Route>
          <Route path="/species" element={<Species />}></Route>
          <Route path="/starships" element={<Starships />}></Route>

          <Route path="/films/:id" element={<FilmDetailPage />} />
          <Route path="/people/:id" element={<PeopleDetailPage />} />
          <Route path="/planets/:id" element={<PlanetDetailPage />} />
          <Route path="/species/:id" element={<SpeciesDetailPage />} />
          <Route path="/starships/:id" element={<StarshipsDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
