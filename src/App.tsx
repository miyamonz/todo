import React from "react";

import { Layout } from "./Layout";

import Home from "./Home";
import Projects from "./Projects";

import { Route } from "wouter";

function App() {
  return (
    <Layout>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/projects/:id">
        <Home />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
    </Layout>
  );
}

export default App;
