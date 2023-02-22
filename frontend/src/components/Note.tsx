import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import NoteDataService from "../services/NoteService";
import INoteData from "../types/Note";

const Note: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentNote, setCurrentNote] = useState<INoteData>(initialNoteState);
  const [message, setMessage] = useState<string>("");

  const getNote = (id: string) => {
    NoteDataService.get(id)
      .then((response: any) => {
        setCurrentNote(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getNote(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentNote.id,
      title: currentNote.title,
      description: currentNote.description,
      published: status
    };

    NoteDataService.update(currentNote.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentNote({ ...currentNote, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateNote = () => {
    NoteDataService.update(currentNote.id, currentNote)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The note was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteNote = () => {
    NoteDataService.remove(currentNote.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/notes");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentNote ? (
        <div className="edit-form">
          <h4>Note</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentNote.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentNote.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentNote.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentNote.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteNote}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateNote}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Note...</p>
        </div>
      )}
    </div>
  );
};

export default Note;
