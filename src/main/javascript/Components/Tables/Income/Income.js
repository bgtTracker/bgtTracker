import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";
import clientJson from "../../../clientJson";
import AuthService from "../../../api/AuthService";

export default function IncomePage() {
  let [test1, test2] = React.useState(0);

  const deleteIncomeData = async delId => {
    clientJson({
      method: "POST",
      path: "/api/deleteIncome/",
      headers: AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).then(response => {
      console.log(response);
    });
  };

  const deleteIncomeCategory = async delId => {
    clientJson({
      method: "POST",
      path: "/api/deleteIncomeCategory/",
      headers: AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).catch(response => {
      alert("Error - cannot delete last category refresh page!")
    });
  };


  return (
    <div>
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="income"
              handleDel={deleteIncomeData}
            />
          </Col>
          <Col xs="4">
            <CustomPaginationTable
              type="category"
              subType="income"
              handleDel={deleteIncomeCategory}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
