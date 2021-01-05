import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";
import clientJson from '../../../clientJson';
import AuthService from "../../../api/AuthService";

const income = [];
var income2 = [];
const categorie = [];

function addIncomes(quantity) {
  const startId = income.length;
  for (let i = 1; i < quantity; i++) {
    const id = startId + i;
    income.push({
      id: id,
      name: "Income name " + id,
      category: "salary",
      date: "05.12.2020",
      amount: 2100 + i,
      note: "NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA NOTATKA ",
      expand: true
    });
  }
}

function addCategories(quantity) {
  const startId = categorie.length;
  for (let i = 1; i < quantity; i++) {
    const id = startId + i;
    let randomC = Math.floor(Math.random() * 16777215).toString(16);
    var randomColor =
      randomC.length === 6
        ? randomC
        : Math.floor(Math.random() * 16777215).toString(16);
    console.log(randomColor);
    categorie.push({
      id: id,
      name: "Category " + id,
      color: "#" + randomColor,
      expand: true
    });
  }
}
//addCategories(20);
addIncomes(100);
const userId = 15;
export default function IncomePage() {
  const [userIncome, setIncomes] = React.useState([]);
  const [userCategory, setCategory] = React.useState([]);

const loadIncomeData = async () => {
  clientJson({method: 'GET', path: '/api/getIncomes/', headers:AuthService.getAuthHeader(), params: {
      user: userId
    }}).then((response) => {
    //console.log(response.entity.income)
    //console.log(income)
    //console.log(response.entity.income.length)
    setIncomes(response.entity.income)
    });
}
const loadCategoryData = async () => {
  clientJson({method: 'GET', path: '/api/getIncomeCategory/', headers:AuthService.getAuthHeader(), params: {
      user: userId
    }}).then((response) => {
    //console.log(response.entity.income)
    //console.log(income)
    //console.log(response.entity.income.length)
    setCategory(response.entity.categoryIncome)
  });
}
  React.useEffect(() => {
        loadIncomeData();
      },[])

  React.useEffect(() => {
    loadCategoryData();
  },[])


  /*React.useEffect(() => {
    clientJson({method: 'GET', path: '/api/getIncomes/', headers:AuthService.getAuthHeader()}).then((response) => {
      console.log(response)
    })
  })*/
  return (
    <div>
      {console.log("hook2")}
      {console.log(userIncome)}
      {console.log(userCategory)}
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="income"
              data={userIncome}
              category={categorie}
            />
          </Col>
          <Col xs="4">
            <CustomPaginationTable
              type="category"
              data={categorie}
              category={categorie}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
