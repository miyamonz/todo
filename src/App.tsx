import React from "react";

import { Layout } from "./Layout";

import Home from "./Home";

import { Route } from "./route";

function App() {
  return (
    <Layout>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/projects">projects</Route>
    </Layout>
  );
}

export default App;
