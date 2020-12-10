import React from "react"
import CustomPaginationTable from "../Table"
import { Container, Row, Col } from 'reactstrap';

const bill = [];
const categorie = [];

  function addBill(quantity) {
    const startId = bill.length;
    for (let i = 1; i < quantity; i++) {
      const id = startId + i;
      bill.push({
        id: id,
        name: 'Bill name ' + id,
        category: "rent",
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
  addBill(89)

export default function Bill(){
    
    
    return (
        <div>
          <Container className="themed-container" fluid={true}>
            <Row>
              <Col xs="8"><CustomPaginationTable type="bill" data={bill} category={categorie}/></Col>
              <Col xs="4"><CustomPaginationTable type="category" data={categorie} category={categorie}/></Col>
            </Row>
          </Container>
        </div>
    )
}
