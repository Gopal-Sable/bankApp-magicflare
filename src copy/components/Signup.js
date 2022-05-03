import React, { useState } from 'react'
import { useHistory } from 'react-router'
import validate from './validate'
const Signup = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" ,err:false})
    const [errors, setErrors] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(credentials))
        console.log(Object.keys(errors).length===0);
        if (errors.err) {
            
        
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
       
        if (json.success  ) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("please check your detials or you may already register", "danger")
        }
    }}
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" required minLength={3} />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={6} />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required minLength={6} />
                    {errors.cpassword && <p>{errors.cpassword}</p>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
