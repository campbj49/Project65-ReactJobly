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
import Profile from "./Profile";

function App() {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useLocalStorage("token");
  const [user, setUser] = useLocalStorage("user");
  const [error, setError] = useState();
  const browserHistory = createBrowserHistory();

  //function for manaing the submission login and registration form
  async function onSubmit(evt){
    evt.preventDefault();
    try{
      if(!formData.username) setUser(await JoblyApi.updateUser(user.username,formData))
      else{
        setToken();
        if(formData.email)
          await setToken(await JoblyApi.signup(formData));
        else
          await setToken(await JoblyApi.login(formData.username, formData.password));
        JoblyApi.token = await JoblyApi.login(formData.username, formData.password);
        setUser(await JoblyApi.getUser(formData.username))
      }
      setError();
    }
    catch(err){
      console.log(err);
      setError("Invalid username or password")
    }
    
    setFormData({});
    browserHistory.push(`/`);
  }

  return (
    <div className="App">
      <BrowserRouter history={browserHistory}>
        <NavBar error = {error}/>
        <main>
          <Switch>
            <Route exact path="/">
              <Home token={token}/>
            </Route>
            <Route path="/logout">
              <Logout setToken={setToken} history={browserHistory} setUser={setUser}/>
            </Route>
            <Route path="/login">
            <LoginForm onSubmit={onSubmit} 
                    setFormData={setFormData}/>
            </Route>
            <Route path="/profile">
            <Profile onSubmit={onSubmit} 
                    setFormData={setFormData}
                    user = {user}
                    formData= {formData}/>
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
function Logout({setToken, history, setUser}){
  setToken();
  setUser();
  JoblyApi.token = undefined;
  history.push("/");
}

export default App;
