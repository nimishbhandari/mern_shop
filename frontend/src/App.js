import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./bootstrap.min.css";

const App = () => {
  return (
    <div className="Core">
      <Header />
      <main>
        <Container>
          <h1>Shop</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
