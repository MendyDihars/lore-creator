import React, { Component } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import EventDashboard from './views/EventDashboard';
import Home from './views/Home';

export default class App extends Component {
  public render() {
    return (
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<EventDashboard />} />
      </Routes>
      </>
    )
  }
}