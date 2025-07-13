import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components";
import { Home } from "./pages";
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
