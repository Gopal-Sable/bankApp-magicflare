import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    // const {deleteNote}=context;
    const { cust } = props;
    const send=()=>{
        
    }
    return (
        <div className="card m-2" style={{ "width": "18rem" }}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">Name: {cust.name}</h5>
                    {/* <i className="far fa-edit mx-3 " onClick={()=>{updateNote(note);}} > edit </i> */}
                    {/* <i className="far fa-trash-alt mx-2" onClick={() => { 
                        deleteNote(note._id)
                       showAlert("Deleted Successfully","success")
                     }}> delete</i> */}
                </div>

                <h6 className="card-subtitle mb-2 text-muted">Email: {cust.email}</h6>
                <p className="card-text">Acc No.: {cust.Acc}</p>
                <input type="button" onClick={send} value="Send" className='btn btn-success' />
            </div>
        </div>
    )
}

export default NoteItem
