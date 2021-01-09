import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";
import clientJson from "../../../clientJson";
import AuthService from "../../../api/AuthService";

export default function Bill() {
  const [userBill, setBill] = React.useState([]);
  const [userCategory, setCategory] = React.useState([]);

  const loadBillData = () => {
    clientJson({
      method: "GET",
      path: "/api/getBills/",
      headers: AuthService.getAuthHeader()
    }).then(response => {
      setBill(response.entity.bill);
    });
  };

  const loadCategoryData = () => {
    clientJson({
      method: "GET",
      path: "/api/getExpenseCategory/",
      headers: AuthService.getAuthHeader()
    }).then(response => {
      setCategory(response.entity.category);
    });
  };

  const deleteBillData = async delId => {
    clientJson({
      method: "POST",
      path: "/api/deleteBill/",
      headers: AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).then(response => {
      console.log(response);
    });
  };

  const deleteExpenseCategory = async delId => {
    clientJson({
      method: "POST",
      path: "/api/deleteExpenseCategory/",
      headers: AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).then(response => {
      console.log(response);
    });
  };

  React.useEffect(() => {
    loadBillData();
  }, []);

  React.useEffect(() => {
    loadCategoryData();
  }, []);

  return (
    <div>
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="bill"
              //data={userBill}
              handleDel={deleteBillData}
              handleEdit={[]}
            />
          </Col>
          <Col xs="4">
            <CustomPaginationTable
              type="category"
              subType="expense"
              //data={userCategory}
              handleDel={deleteExpenseCategory}
              handleEdit={[]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
