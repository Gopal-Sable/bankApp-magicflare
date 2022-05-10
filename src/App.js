import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Users from './components/Users';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>

      <NoteState>
        <div >
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Switch>
                <Route exact path="/users">
                  <Users />
                </Route>
                <Route exact path="/" >
                  <Home showAlert={showAlert} />
                </Route>
                <Route exact path="/login" >
                  <Login showAlert={showAlert} />
                </Route>
                <Route exact path="/signup" >
                  <Signup showAlert={showAlert} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </NoteState>
    </>
  );
}

export default App;
