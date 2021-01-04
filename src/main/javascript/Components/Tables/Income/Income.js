import React from "react";
import CustomPaginationTable from "../Table";
import { Container, Row, Col } from "reactstrap";

const income = [];
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
addCategories(20);
addIncomes(100);

export default function IncomePage() {
  return (
    <div>
      <Container className="themed-container" fluid={true}>
        <Row>
          <Col xs="8">
            <CustomPaginationTable
              type="income"
              data={income}
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
