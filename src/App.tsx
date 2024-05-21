import "./assets/scss/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/Container";
import Films from "./pages/Films";

function App() {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/films" element={<Films />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
