import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from "./api";
import { async } from "q";

function Individual({ cantFind, token }) {
  const { base, handle } = useParams();
  const [individual, setIndividual] = useState([]);

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
  
  //ensures the user is logged in
  if(!token) {
    return (<h1 style={{color:"orange"}}>Login to view</h1>)
  }


  async function sendApp(e){
    e.preventDefault()
    console.log(e.target.id);
  }

  let apply;
  if(base === "jobs") apply=(<button id={individual.id} onClick={sendApp}>Apply</button>)
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
