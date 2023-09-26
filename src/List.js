//modified Companies.js provided in the Snack or Booze project
import React, {useEffect, useState} from "react";
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import JoblyApi from "./api";
import "./List.css";

function List() {
  const [list, setList] = useState(["no"]);
  const { base } = useParams();
  useEffect(()=>{
    async function getList(){
      await setList(await JoblyApi.getList(base));
      console.log(list);
    }
    getList();
  }, [])
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {base}
          </CardTitle>
          <ListGroup>
            {list.map((item) => {
              if(item.handle)
              return (
                <Link to={`/companies/${item.handle}`} key={item.handle}>
                    <ListGroupItem>{item.name}</ListGroupItem>
                </Link>
            )
            else return (
              <Link to={`jobs/${item.id}`} key={item.id}>
                  <ListGroupItem>{item.title}</ListGroupItem>
              </Link>
            )
            })}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default List;
