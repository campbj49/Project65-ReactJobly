//modified Companies.js provided in the Snack or Booze project
import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import JoblyApi from "./api";
import "./Companies.css";

function Companies() {
  const [companyList, setCompanyList] = useState(["no"]);
  useEffect(()=>{
    async function getCompanyData(){
      setCompanyList(await JoblyApi.getAllCompanies());
    }
    getCompanyData();
  }, [])
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Companies
          </CardTitle>
          <ListGroup>
            {companyList.map(company => (
                <ListGroupItem key={company.handle}>{company.name}</ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default Companies;
