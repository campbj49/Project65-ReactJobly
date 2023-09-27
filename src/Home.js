//modified Home.js provided in the Snack or Booze project
import React, {useEffect, useState} from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import JoblyApi from "./api";

function Home({token}) {
  let welcomeMessage = "Welcome to React Jobly, login or register to access all pages";
  if(token!= "undefined") welcomeMessage= "You now have access to all pages";
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              {welcomeMessage}
            </h3>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
