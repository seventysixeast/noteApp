import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNote from "./components/AddNote";
import Note from "./components/Note";
import NotesList from "./components/NotesList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/notes" className="navbar-brand">
          <img src="mynotes-low-resolution-logo-white-on-black-background.png" style={{height:'20px'}}/>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/notes"} className="nav-link">
              Notes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<NotesList/>} />
          <Route path="/notes" element={<NotesList/>} />
          <Route path="/add" element={<AddNote/>} />
          <Route path="/notes/:id" element={<Note/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
