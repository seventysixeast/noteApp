import React, { useState, useEffect, ChangeEvent } from "react";
import NoteDataService from "../services/NoteService";
import { Link } from "react-router-dom";
import INoteData from '../types/Note';

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Array<INoteData>>([]);
  const [currentNote, setCurrentNote] = useState<INoteData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveNotes();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveNotes = () => {
    NoteDataService.getAll()
      .then((response: any) => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveNotes();
    setCurrentNote(null);
    setCurrentIndex(-1);
  };

  const setActiveNote = (note: INoteData, index: number) => {
    setCurrentNote(note);
    setCurrentIndex(index);
  };

  const removeAllNotes = () => {
    NoteDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    NoteDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setNotes(response.data);
        setCurrentNote(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Notes List</h4>

        <ul className="list-group">
          {notes &&
            notes.map((note, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveNote(note, index)}
                key={index}
              >
                {note.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllNotes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentNote ? (
          <div>
            <h4>Note</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentNote.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentNote.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentNote.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/notes/" + currentNote.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Note...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
