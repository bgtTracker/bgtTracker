import React from "react"
import CustomPaginationTable from "../Table"
import { Container, Row, Col } from 'reactstrap';


const expense = [];
const categorie = [];

  function addExpense(quantity) {
    const startId = expense.length;
    for (let i = 1; i < quantity; i++) {
      const id = startId + i;
      expense.push({
        id: id,
        name: 'Expense name ' + id,
        category: "shopping",
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
      let randomC = Math.floor(Math.random()*16777215).toString(16)
      var randomColor = ((randomC.length) === 6 ? randomC : Math.floor(Math.random()*16777215).toString(16))
      console.log(randomColor)
      categorie.push({
        id: id,
        name: 'Category ' + id,
        color: "#" + randomColor,
        expand: true
      });
    }
  }
  addCategories(5)
  addExpense(89)

export default function Expense(){
    
    
    return (
        <div>
          <Container className="themed-container" fluid={true}>
            <Row>
              <Col xs="8"><CustomPaginationTable type="expense" data={expense} category={categorie}/></Col>
              <Col xs="4"><CustomPaginationTable type="category" data={categorie} category={categorie}/></Col>
            </Row>
          </Container>
        </div>
    )
}