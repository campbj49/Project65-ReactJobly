import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import List from "./List";
import Individual from "./Individual";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm.js";
import JoblyApi from "./api";
import { createBrowserHistory } from 'history';
import useLocalStorage from "./useLocalStorage";

function App() {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useLocalStorage("token");
  const [error, setError] = useState();
  const browserHistory = createBrowserHistory();
  console.log(token);

  //function for manaing the submission login and registration form
  async function onSubmit(evt){
    evt.preventDefault();
    try{
      if(formData.email)
        setToken(await JoblyApi.signup(formData));
      else
        setToken(await JoblyApi.login(formData.username, formData.password));
      console.log(token);
      setError();
    }
    catch{
      setError("Invalid username or password")
    }
    
    setFormData({});
    browserHistory.push(`/`);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar error = {error}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home token={token}/>
            </Route>
            <Route path="/logout">
              <Logout setToken={setToken} history={browserHistory}/>
            </Route>
            <Route path="/login">
            <LoginForm onSubmit={onSubmit} 
                    setFormData={setFormData}/>
            </Route>
            <Route path="/signup">
            <SignupForm onSubmit={onSubmit} 
                    setFormData={setFormData}/>
            </Route>
            <Route exact path="/:base" token={token}>
              <List/>
            </Route>
            <Route path="/:base/:handle" token={token}>
              <Individual cantFind="/:base" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

//mini component for logging out
function Logout({setToken, history}){
  setToken();
  history.push("/");
}

export default App;
