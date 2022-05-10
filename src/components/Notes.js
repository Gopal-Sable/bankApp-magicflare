import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';

import noteContext from "../context/notes/noteContext.js"
import AddNote from './AddNote.js';
import NoteItem from './NoteItem.jsx';

const Notes = (props) => {
    const { showAlert } = props;
    let history = useHistory();
    const context = useContext(noteContext);
    // eslint-disable-next-line 
    const { notes, showNotes } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            showNotes();
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })
    const ref = useRef(null);
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })

    }

    const handleChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        // e.preventDefault();

        // console.log("updating...", note);
        // editNote(note.id, note.title, note.description, note.tag)
        refClose.current.click();
        showAlert("updated Successfully", "success")
    }
    return (
        <>
            <AddNote showAlert={showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h2>Edit Note</h2>
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input required type="text" value={note.title} className="form-control" name="title" onChange={handleChange} id="title" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input required type="text" value={note.description} className="form-control" onChange={handleChange} id="description" name="description" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input required type="text" value={note.tag} className="form-control" onChange={handleChange} id="tag" name="tag" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row container">
                <h2>your notes</h2>
                <div className="container mx-3">
                    {notes.length === 0 && "No notes to disply"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />;
                })}


            </div>
        </>
    )

}
export default Notes;
