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

function App() {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState();
  console.log(token);

  //function for manaing the submission login and registration form
  async function onSubmit(evt){
    evt.preventDefault();
    console.log(formData);
    if(formData.email)
      setToken(await JoblyApi.signup(formData));
    else
      setToken(await JoblyApi.login(formData.username, formData.password));
    console.log(token);
    
    setFormData({});
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/login">
            <LoginForm onSubmit={onSubmit} 
                    setFormData={setFormData}/>
            </Route>
            <Route path="/signup">
            <SignupForm onSubmit={onSubmit} 
                    setFormData={setFormData}/>
            </Route>
            <Route exact path="/:base">
              <List/>
            </Route>
            <Route path="/:base/:handle">
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

export default App;
