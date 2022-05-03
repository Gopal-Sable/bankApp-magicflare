import React, { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)

    //show all note
    const showNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        // console.log(data);
        //logic to show in client site or UI
        setNotes(data)
    }


    //add note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        // console.log(data);
        //logic to show in client site or UI
        setNotes(notes.concat(data))
    }

    //delete note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);

        //logic to show in client site or UI
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // edit note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        console.log(data);

        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to show in client site or UI
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {

                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, showNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
