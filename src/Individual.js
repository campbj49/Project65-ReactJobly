import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from "./api";

function Individual({ cantFind }) {
  const { base, handle } = useParams();
  const [individual, setIndividual] = useState([])

  useEffect(()=>{
    async function getIndividual(){
        if(base === "companies")setIndividual(await JoblyApi.getCompany(handle))
        else{
          let job = await JoblyApi.getJob(handle);
          setIndividual({name:job.title, description:`Salary: ${job.salary}`})
      }
    }
    getIndividual();
  }, []);

  let apply;
  if(base === "jobs") apply=(<button>Apply</button>)
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {individual.name}
          </CardTitle>
          <CardText className="font-italic">{individual.description}</CardText>
        </CardBody>
      </Card>
      {apply}
    </section>
  );
}

export default Individual;
