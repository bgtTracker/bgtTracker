import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";
import clientJson from "../../../clientJson";
import AuthService from "../../../api/AuthService";

export default function Expense() {
  const [userExpense, setExpense] = React.useState([]);
  const [userCategory, setCategory] = React.useState([]);

  const loadExpenseData =  () => {
    clientJson({method: 'GET', path: '/api/getExpenses/', headers:AuthService.getAuthHeader() }).then((response) => {
      setExpense(response.entity.expense)
    });
  }
  const loadCategoryData =  () => {
    clientJson({method: 'GET', path: '/api/getExpenseCategory/', headers:AuthService.getAuthHeader()}).then((response) => {
      setCategory(response.entity.category)
    });
  }

  const deleteExpenseData = async (delId) => {
    clientJson({method: 'POST', path: '/api/deleteExpense/', headers:AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).then((response) => {
      console.log(response)
    })
  }

  const deleteExpenseCategory = async (delId) => {
    clientJson({method: 'POST', path: '/api/deleteExpenseCategory/', headers:AuthService.getAuthHeader(),
      params: {
        id: delId
      }
    }).then((response) => {
      console.log(response)
    })
  }

  React.useEffect(() => {
    loadExpenseData();
  },[])

  React.useEffect(() => {
    loadCategoryData();
  },[])

  return (
    <div>
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="expense"
              //data={userExpense}
              handleDel={deleteExpenseData}
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
