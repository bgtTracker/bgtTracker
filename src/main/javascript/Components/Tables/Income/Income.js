import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";
import clientJson from "../../../clientJson";
import AuthService from "../../../api/AuthService";

export default function IncomePage() {
  const [userIncome, setIncomes] = React.useState([]);
  const [userCategory, setCategory] = React.useState([]);
  const [newIncome, postIncome] = React.useState(false);
  const [newCategory, postCategory] = React.useState(false);

  //const forceUpdate = useForceUpdate(); // test
  // to delete
  const loadIncomeData = () => {
    clientJson({
      method: "GET",
      path: "/api/getIncomes/",
      headers: AuthService.getAuthHeader()
    }).then(response => {
      //console.log(response.entity.income)
      //console.log(income)
      //console.log(response.entity.income.length)
      //console.log("typ response Entitty", response.entity)
      setIncomes(response.entity.income);
    });
    /* Testuje */
    //postIncome(!newIncome)
  };

  const loadCategoryData = () => {
    clientJson({
      method: "GET",
      path: "/api/getIncomeCategory/",
      headers: AuthService.getAuthHeader()
    }).then(response => {
      //console.log(response.entity.category)
      setCategory(response.entity.category);
    });
  };

  const insertIncomeData = newData => {
    console.log("Wstawianie 1");
    clientJson({
      method: "POST",
      path: "/api/newIncome/",
      headers: AuthService.getAuthHeader(),
      params: {
        name: newData.name,
        category_id: newData.category,
        amount: newData.amount,
        date: newData.date,
        note: newData.note
      }
    }).then(response => {
      console.log(response);
    });
    console.log("Wstawianie 2");
  };
  const insertCategoryData = async newData => {
    clientJson({
      method: "POST",
      path: "/api/newIncomeCategory/",
      headers: AuthService.getAuthHeader(),
      params: {
        name: newData.name
      }
    }).then(response => {
      console.log(response);
    });
  };

  const loadIncomeData2 = async () => {
    clientJson({
      method: "GET",
      path: "/api/getIncomes/",
      headers: AuthService.getAuthHeader()
    }).then(response => {
      setIncomes(response.entity.income);
    });
  };
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
    }).then(response => {
      console.log(response);
    });
  };

  React.useEffect(() => {
    loadIncomeData();
  }, []);

  React.useEffect(() => {
    loadCategoryData();
  }, []);

  /*console.log("TEST")
  console.log(newIncome)
  console.log(newIncome)*/
  //console.log("typ z income", typeof userCategory)
  //console.log(userCategory)
  //console.log("income:", userIncome)
  //console.log("incomeCat:", userCategory)
  return (
    <div>
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="income"
              //data={userIncome}
              //data={[]}
              //category={[]}
              //category={[]}
              handleIns={insertIncomeData}
              handleDel={deleteIncomeData}
              handleEdit={[]}
              //handleData={loadIncomeData2}
            />
          </Col>
          <Col xs="4">
            <CustomPaginationTable
              type="category"
              subType="income"
              //data={userCategory}
              //category={[]}
              handleDel={deleteIncomeCategory}
              handleEdit={[]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
