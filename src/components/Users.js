// import React, { useContext,useEffect } from 'react'

import { useState, useEffect } from "react";
import NoteItem from "./NoteItem";

// import noteContext from '../context/notes/noteContext'


function Users() {
    const [cust, setCust] = useState([])
    useEffect(() => {
        alluser();
        // eslint-disable-next-line
    }, [])
    const alluser = async () => {
        //API Call
        let host = "localhost:5000"
        const response = await fetch(`http://localhost:5000/api/auth/allUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        // console.log(data);
        //logic to show in client site or UI
        setCust(data)
    }
    return (
        <div className="row">
            
            {cust.map((element) => {
                return (
                    <NoteItem key={element.Acc} cust={element}/>)
            })}
        </div>
    )
}

export default Users
