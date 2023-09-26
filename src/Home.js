//modified Home.js provided in the Snack or Booze project
import React, {useEffect, useState} from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import JoblyApi from "./api";

function Home() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to React Jobly
            </h3>
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
