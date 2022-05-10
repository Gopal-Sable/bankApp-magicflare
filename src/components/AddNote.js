import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { add } = context;
    const [note, setNote] = useState({ Acc:"",balance:"" })

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        add(note.Acc,note.balance);
        setNote({ Acc: "", balance: ""})
        props.showAlert("Amount Added Successfully To Your Account","success")
    }

    return (
        <div className="container my-3">
            <h2>Add a Money</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="Acc" className="form-label">Receiver Acc. No</label>
                    <input type="number" value={note.Acc} className="form-control" name="Acc" onChange={handleChange} id="Acc" aria-describedby="emailHelp" />

                </div>
              
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Amount</label>
                    <input type="number" value={note.balance} className="form-control" onChange={handleChange} id="balance" name="balance" />
                </div>
                <button type="submit" disabled={note.balance < 0} onClick={handleClick} className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}

export default AddNote
