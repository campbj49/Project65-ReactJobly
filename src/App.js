import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import List from "./List";
import Individual from "./Individual";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/:base">
              <List/>
            </Route>
            <Route path="/:base/:handle">
              <Individual cantFind="/:base" />
            </Route>
            {/* <Route exact path="/drinks">
              <Menu snacks={drinks} title="Drinks" root ="drinks" desc="The best drinks to go with your snack"/>
            </Route>
            <Route path="/drinks/:id">
              <Item items={drinks} cantFind="/drinks" />
            </Route>
            <Route path="/new">
            <NewItemForm onSubmit={onSubmit} 
                    formData={formData} 
                    setFormData={setFormData}/>
            </Route> */}
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
