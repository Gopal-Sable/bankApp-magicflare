import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote}=context;
    const { note,updateNote,showAlert } = props;
    return (
        <div className="card m-2 col-2" style={{ "width": "18rem" }}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="far fa-edit mx-3 " onClick={()=>{updateNote(note);}} > edit </i>
                    <i className="far fa-trash-alt mx-2" onClick={() => { 
                        deleteNote(note._id)
                       showAlert("Deleted Successfully","success")
                     }}> delete</i>
                </div>

                <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>

            </div>
        </div>
    )
}

export default NoteItem
