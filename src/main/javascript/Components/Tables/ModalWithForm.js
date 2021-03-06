import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Form, FormGroup, Label, FormText } from "reactstrap";
import { Badge } from "reactstrap";
import clientJson from "../../clientJson";
import AuthService from "../../api/AuthService";

export default class ModalWithForm extends React.Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      nowDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1) +
        "-" +
        (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());

    this.state = {
      type: this.props.type,

      name: "",
      amount: "",
      category: "",
      category_id: -1,
      color: "#000000",

      date: "",
      note: "",
      bankAccount: "",

      categories: "",
      categoryName: "1",

      isFetching: false,
      buttonLabel: "New row",
      modalLabel: "New row",
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeNote = this.changeNote.bind(this);
    this.changeBankAccount = this.changeBankAccount.bind(this);
    this.setState = this.setState.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.componentDidMount();

    //console.log("this.props.mode", this.props.mode)
    //console.log("rowSelected", this.props.row)
    if (this.props.mode === "insert") {
      this.resetState();
      if (this.state.categories.length !== 0) {
        this.setState({ category: this.state.categories[0].id });
      }
    }
    if (this.props.row !== -1 && this.props.mode === "edit") {
      this.stateToEdit();
    }

    this.setState(prevState => {
      if (this.props.mode === "edit" && this.props.row === -1) {
        alert("You have to choose row to edit!");
        return { modal: this.state.modal };
      } else {
        return { modal: !this.state.modal };
      }
    });
  }

  resetState() {
    this.setState({
      type: this.props.type,
      //basic
      name: "",
      amount: "",
      category: -1,
      category_id: -1,
      color: "#000000",
      date: "",
      note: "",
      bankAccount: "",
      test: false,

      id: 0,

      categoryName: "1",

      buttonLabel: "New row",
      modalLabel: "New row",
      modal: false
    });
  }
  stateToEdit() {
    this.setState({
      name: this.props.rowContent.name,
      note: this.props.rowContent.note
    });
    if (this.state.type === "bill") {
      this.setState({ bankAccount: this.props.rowContent.bankAccount });
    }
    if (this.state.type !== "category") {
      this.setState({
        date:
          this.props.rowContent.date.slice(6, 10) +
          "-" +
          this.props.rowContent.date.slice(3, 5) +
          "-" +
          this.props.rowContent.date.slice(0, 2),
        amount: (parseFloat(this.props.rowContent.amount) / 100).toFixed(2),
        category: this.props.rowContent.category,
        category_id: this.props.rowContent.category_id
      });
    }
    if (this.state.type === "category") {
      //console.log("normalnie ziomo", typeof this.props.rowContent.note)
      this.setState({
        color: this.props.rowContent.color,
        note: this.props.rowContent.note
      });
      //console.log("normalnie ziomo2", this.state.note)
    }
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeAmount(event) {
    this.setState({ amount: event.target.value });
  }

  changeDate(event) {
    this.setState({ date: event.target.value });
  }

  changeCategory(event) {
    this.setState({ category: event.target.value });
  }

  changeNote(event) {
    this.setState({ note: event.target.value });
  }

  changeColor(event) {
    this.setState({ color: event.target.value });
  }

  changeBankAccount(event) {
    if (this.state.type === "bill") {
      this.setState({ bankAccount: event.target.value });
    }
  }
  checkData() {
    var errorAlert = "";
    if (this.state.type !== "category") {
      if (this.state.category == -1) {
        alert("You have to choose category");
        return false;
      }
      // for income 1.name 2.amount 3.category 4.date
      if (this.state.name !== "" && this.state.amount !== "" && this.state.category !== -1 && this.state.date !== "") {
        if (this.state.type === "bill") {
          console.log("bank Account type", typeof this.state.bankAccount);
          if (this.state.bankAccount.length > 0 && this.state.bankAccount.length < 26) {
            alert("Invalid bank account number! Check again");
            return false;
          }
        }
        return true;
      } else {
        alert("You have to choose category and name, amount and date");
        return false;
      }
    } else {
      if (this.state.name !== "") return true;
      else {
        alert("You have to give category a name!");
        return false;
      }
    }
  }

  handleSubmit() {
    console.log(this.state.category);
    console.log("this.state", this.state);
    if (this.checkData()) {
      if (this.state.type !== "category") {
        var t = this.state.categories.filter(i => {
          return i.id == this.state.category;
        });
        this.setState({ amount: parseInt(parseFloat(this.state.amount) * 100).toString() });
        this.setState({ categoryName: t[0].name }, () => {
          if (this.props.mode === "insert") {
            this.props.handleNew(this.state);
          }
          if (this.props.mode === "edit") {
            this.props.handleNew(this.props.row, this.state);
          }
          {
            console.log("NIE EDYCJI");
          }

          this.toggle();
        });
      } else if (this.state.type === "category") {
        if (this.props.mode === "insert") {
          this.props.handleNew(this.state);
        }
        if (this.props.mode === "edit") {
          this.props.handleNew(this.props.row, this.state);
        }
        this.toggle();
      } else {
        this.toggle();
      }
    }
  }

  colorFormat(cell) {
    return <Badge style={{ backgroundColor: cell, color: cell }}>{cell}</Badge>;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log("Modal is fatching category data");

    if (this.state.type === "income") {
      this.setState(() => {
        clientJson({
          method: "GET",
          path: "/api/getIncomeCategory/",
          headers: AuthService.getAuthHeader()
        }).then(response => {
          //console.log("tak to to", response.entity.category)
          this.setState({ categories: response.entity.category });
        });
      });
    } else {
      this.setState(() => {
        clientJson({
          method: "GET",
          path: "/api/getExpenseCategory/",
          headers: AuthService.getAuthHeader()
        }).then(response => {
          //console.log("tak to to", response.entity.category)
          this.setState({ categories: response.entity.category });
          //console.log("fetfet", this.state.categories);
        });
      });
    }
    //console.log("fet", this.state.categories);
  }

  render() {
    //console.log("fetreder", this.state.categories);
    const buttonColor = this.props.color;
    const modalMode = this.props.mode;

    //var selectOpt = this.props.category
    var selectOpt2 = this.state.categories;

    this.state.buttonLabel = this.props.buttonLabel;
    var categorySelect;
    //console.log("co jest grane");
    if (this.state.categories !== "") {
      //console.log("JEST");
      var categoryDefult = <option value={-1}></option>;
      categorySelect = selectOpt2.map(cat => <option value={cat.id}> {cat.name} </option>);
      //console.log("please", categorySelect);
    } else {
      //console.log("NIE JEST");
      categorySelect = <option value={0}> {"Niema"} </option>;
    }

    /*if(this.state.categories!=""){
            //console.log("Categorie test", this.state.categories[0].id)
        }*/

    var formBody = (
      <div>
        <FormGroup>
          <Label>
            {this.state.type === "income"
              ? "Income name"
              : this.state.type === "expense"
              ? "Expense name"
              : this.state.type === "bill"
              ? "Bill name"
              : "Category name"}
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter text"
            onChange={this.changeName}
            value={this.state.name}
          />
        </FormGroup>
        {this.state.type === "bill" && (
          <Row>
            <Col xs="4">
              <FormGroup>
                <Label>Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={this.changeAmount}
                  value={this.state.amount}
                  step="0.01"
                  maxLength={7}
                  //pattern={"^\\d*(\\.\\d{0,2})?$"}
                />
              </FormGroup>
            </Col>
            <Col xs="8">
              <FormGroup>
                <Label>Bank account</Label>
                <Input
                  type="text"
                  name="bank"
                  id="bank"
                  placeholder="Enter bank account"
                  onChange={this.changeBankAccount}
                  value={this.state.bankAccount}
                  maxLength={26}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
        {this.state.type !== "bill" && (
          <FormGroup>
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              onChange={this.changeAmount}
              value={this.state.amount}
              step="0.01"
            />
          </FormGroup>
        )}
        <Row>
          <Col>
            <FormGroup>
              <Label>{this.state.type === "bill" ? "Payment to" : "Date"}</Label>
              <Input
                type="date"
                name="date"
                id="date"
                placeholder="Enter date"
                onChange={this.changeDate}
                value={this.state.date}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Choose category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                onChange={this.changeCategory}
                value={this.state.category}
                placeholder={"Choose category"}
              >
                {categoryDefult}
                {categorySelect}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label>Note</Label>
          <Input type="textarea" name="note" id="note" onChange={this.changeNote} value={this.state.note} />
        </FormGroup>
      </div>
    );
    var catBody = (
      <div>
        <Row>
          <Col>
            <FormGroup>
              <Label>Category name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter text"
                onChange={this.changeName}
                value={this.state.name}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Category color</Label>
              <Input
                type="color"
                name="color"
                id="color"
                placeholder="Choose color"
                onChange={this.changeColor}
                value={this.state.color}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label>Note</Label>
          <Input type="textarea" name="note" id="note" onChange={this.changeNote} />
        </FormGroup>
      </div>
    );

    return (
      <div>
        <Button color={buttonColor} onClick={this.toggle}>
          {this.state.buttonLabel}
        </Button>
        <Modal
          onSubmit={this.handleSubmit}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.state.className}
          size="lg"
          style={{
            position: "absolute",
            top: "50px",
            right: "100px",
            bottom: 0,
            left: 0,
            zIndex: 10040,
            overflow: "auto",
            overflowY: "auto"
          }}
        >
          {/*<ModalHeader toggle={this.toggle}>{this.state.type === "income"? "New Income" : this.state.type === "expense" ? "New Expense" : this.state.type === "bill" ? "New Bill " : "New category"}</ModalHeader>*/}
          <ModalHeader toggle={this.toggle}>
            {(modalMode === "insert" ? "New " : "Edit ") +
              (this.state.type === "income"
                ? "Income"
                : this.state.type === "expense"
                ? "Expense"
                : this.state.type === "bill"
                ? "Bill "
                : "category")}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>{this.state.type === "category" ? catBody : formBody}</Form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
