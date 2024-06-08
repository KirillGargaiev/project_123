import React from 'react';
import {setup,} from "goober";
import { createElement } from 'react';
import {prefix} from "goober/prefixer";
import {Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import SignUp from "./components/SignUp";

setup(createElement, prefix);

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
  );
}

export default App;

