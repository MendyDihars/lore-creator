import React, { Component } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './views/Home';

export default class App extends Component {
  public render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    )
  }
}