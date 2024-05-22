import "./assets/scss/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/Container";
import Films from "./pages/Films";
import DetailView from "./components/Details";
import People from "./pages/People";
import FilmDetailPage from "./pages/FilmDetailPage";

function App() {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/films" element={<Films />}></Route>
          <Route path="/people" element={<People />}></Route>

          <Route path="/films/:id" element={<FilmDetailPage />} />
          {/* // <Route
          //   path="/people/:id"
          //   element={<FilmDetailPage />}
          // /> */}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
