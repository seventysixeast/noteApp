import React, { useState, ChangeEvent } from "react";
import NoteDataService from "../services/NoteService";
import INoteData from '../types/Note';

const AddNote: React.FC = () => {
  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [note, setNote] = useState<INoteData>(initialNoteState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const saveNote = () => {
    var data = {
      title: note.title,
      description: note.description
    };

    NoteDataService.create(data)
      .then((response: any) => {
        setNote({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newNote = () => {
    setNote(initialNoteState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newNote}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={note.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={note.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveNote} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNote;
