import React from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertButton,
  DeleteButton,
  BSTable
} from "react-bootstrap-table";
import { Button } from "reactstrap";
import ModalWithForm from "./ModalWithForm";
import { Container, Row, Col } from "reactstrap";
import { Badge } from "reactstrap";
import {Input, FormGroup, Label } from 'reactstrap';

import "../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import clientJson from "../../clientJson";
import AuthService from "../../api/AuthService";

function colorFormat(cell, row) {
  return <Badge style={{ backgroundColor: cell, color: cell }}>{cell}</Badge>;
}


const userId = 15;

export default class CustomPaginationTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cellEditMode: "none",
      selected: -1,
      test: [],

    }
    this.refs = React.createRef();

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    this.insertData = this.insertData.bind(this)
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this)
    this.handleRowSelect = this.handleRowSelect.bind(this)
    this.isD2 = this.isD2.bind(this)
    //this.testClick = this.testClick.bind(this)
  }

  /*testClick(){
    const t = this.props.test3()
    console.log("test clicked !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(t)
  }*/
  handleEditButtonClick() {

    this.setState((prevState) => {
      console.log(prevState)
      let ret
      if(prevState.cellEditMode === "dbclick"){
        console.log("tak")
        alert("Edit mode disactivated")
        ret = {cellEditMode: "none"}
      }
      if(prevState.cellEditMode === "none") {
        alert("Edit mode activated")
        console.log("taktak")
        ret = {cellEditMode: "dbclick"}
      }
      return ret

    })
  }

  insertData(newData) {
    if(this.props.type === "income")
    {
      this.setState((prevState) => {
        var newId;
        clientJson({method: 'POST', path: '/api/newIncome/', headers:AuthService.getAuthHeader(),
          params: {
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount
          }}).then((response) => {
          newId = response.entity
        }).then((response) => {
          this.setState((prevState) => {
            return {
              data: this.state.data.push({
                id: newId,
                name: newData.name,
                category: newData.categoryName,
                date: "05.12.2020",
                amount: newData.amount,
                note: "Jest dobrze",
                expand: true
              })
            }
          })
        })
      })
    }
    else if(this.props.type === "expense"){
      this.setState((prevState) => {
        var newId;
        clientJson({method: 'POST', path: '/api/newExpense/', headers:AuthService.getAuthHeader(),
          params: {
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount
          }}).then((response) => {
          newId = response.entity
        }).then((response) => {
          this.setState((prevState) => {
            return {
              data: this.state.data.push({
                id: newId,
                name: newData.name,
                category: newData.categoryName,
                date: "05.12.2020",
                amount: newData.amount,
                note: "Jest dobrze",
                expand: true
              })
            }
          })
        })
      })
    }
    else if(this.props.type === "bill")
    {
      this.setState((prevState) => {
        var newId;
        clientJson({method: 'POST', path: '/api/newBill/', headers:AuthService.getAuthHeader(),
          params: {
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount
          }}).then((response) => {
          newId = response.entity
        }).then((response) => {
          this.setState((prevState) => {
            return {
              data: this.state.data.push({
                id: newId,
                name: newData.name,
                category: newData.categoryName,
                date: "05.12.2020",
                amount: newData.amount,
                note: "Jest dobrze",
                expand: true
              })
            }
          })
        })
      })
    }
    else if(this.props.type === "category"){
      if(this.props.subType === "income")
      {
        this.setState(() => {
          var newId;
          clientJson({method: 'POST', path: '/api/newIncomeCategory/', headers:AuthService.getAuthHeader(),
            params: {
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then((response) => {
            newId = response.entity
            console.log(response)
          }).then((response) => {
            this.setState((prevState) => {
              return {
                data: this.state.data.push({
                  id: newId,
                  name: newData.name,
                  color: newData.color,
                  note: newData.note
                })
              }
            })
          })
        })
      }
      else if(this.props.subType === "expense")
      {
        this.setState(() => {
          var newId;
          clientJson({method: 'POST', path: '/api/newExpenseCategory/', headers:AuthService.getAuthHeader(),
            params: {
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then((response) => {
            newId = response.entity
            console.log(response)
          }).then((response) => {
            this.setState((prevState) => {
              return {
                data: this.state.data.push({
                  id: newId,
                  name: newData.name,
                  color: newData.color,
                  note: newData.note
                })
              }
            })
          })
        })
      }
      else{console.log("Wystapil problem")}


    }
    else {console.log("Wystapil problem")}
  }

  isD2(newData){
      console.log("Lets try it again")
      //this.props.insertFun(newData)
  }

  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
        <div>
          <FormGroup>
            <Label >Note</Label>
            <Input type="textarea" name="note" id="note"   value={row.note} disabled/>
          </FormGroup>
        </div>
    );
  }

  expandComponentBill(row) {

    return (

        <div>
          <div>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label>Payment to</Label>
                  <Input type="date" name="date" id="date" value={"2000-01-01"}  disabled/>
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label>State</Label>
                  <Input type="text" name="state" id="state" value={"PAID"}  disabled/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label>Bank account</Label>
                  <Input type="text" name="account" id="account" value={"95235565554000125"}  disabled/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label >Note</Label>
              <Input type="textarea" name="note" id="note"   value={row.note} disabled/>
            </FormGroup>
          </div>
        </div>
    );
  }

  handleDeleteButtonClick() {
    let selectedId = this.state.selected // id to delete
    if(selectedId === -1)
    {
      alert("You have to choose row")
      return
    }
    let data = this.state.data
    let tableId = -1;
    for (var i=0; i<this.state.data.length; i++)
    {
      if(this.state.data[i].id == selectedId)
        tableId = i
    }
    //console.log("dziejej sie ?")

    this.props.handleDel(selectedId)
    data.splice(tableId, 1)
    this.setState({data: data})
    this.setState({selected: -1})

  }
  handleRowSelect(row) {
    //console.log(this.state.test)
    this.setState((prevState) => {
      return {selected: row.id}
    })
  }
  handletest(){
    console.log("working")
  }
  render() {
    //console.log("Wyswietlam tabele")
    //console.log(this.state.data[0])
    const type = this.props.type

    this.state.data =  this.props.data
    var category = this.props.category

    var rows
    var modalType
    var modalLabel
    var modalButtonLabel

    if (type === "income") {
      rows = [
        {dataField: "id", label: "ID", isKey: true, hidden: true},
        {dataField: "name", label: "Income Name", isKey: false, hidden: false},
        {dataField: "category", label: "Category", isKey: false, hidden: false},
        {dataField: "date", label: "Date", isKey: false, hidden: false},
        {dataField: "amount", label: "Amount", isKey: false, hidden: false},
      ]
      modalButtonLabel = "Add new Income"
      modalLabel = "New income"
      modalType = "income"
    } else if (type === "expense") {
      rows = [
        {dataField: "id", label: "ID", isKey: true, hidden: true},
        {dataField: "name", label: "Expense Name", isKey: false, hidden: false},
        {dataField: "category", label: "Category", isKey: false, hidden: false},
        {dataField: "dateStamp", label: "Date", isKey: false, hidden: false},//zmiana
        {dataField: "amount", label: "Amount", isKey: false, hidden: false},
      ]
      modalButtonLabel = "Add new Expense"
      modalLabel = "New Expense"
      modalType = "expense"
    } else if (type === "bill") {
      rows = [
        {dataField: "id", label: "ID", isKey: true, hidden: true},
        {dataField: "name", label: "Bill Name", isKey: false, hidden: false},
        {dataField: "category", label: "Category", isKey: false, hidden: false},
        {dataField: "date", label: "Date", isKey: false, hidden: false},
        {dataField: "amount", label: "Amount", isKey: false, hidden: false},
      ]
      modalButtonLabel = "Add new bill"
      modalLabel = "New bill"
      modalType = "bill"
    } else {
      rows = [
        {dataField: "id", label: "ID", isKey: true, hidden: true},
        {dataField: "name", label: "Category", isKey: false, hidden: false},
        {dataField: "color", label: "Color", isKey: false, hidden: false},
      ]
      modalButtonLabel = "Add new Category"
      modalLabel = "New category"
      modalType = "category"
    }



    const tableBody = rows.map((foo) => (
        foo.dataField==="color" ? <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataFormat={colorFormat}>{foo.label}</TableHeaderColumn>:
            <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataSort={true}>{foo.label}</TableHeaderColumn>))

    console.log("props2", this.props.type)
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '100', value: 100
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: '<', // Previous page button text
      nextPage: '>', // Next page button text
      firstPage: '<<', // First page button text
      lastPage: '>>', // Last page button text
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      clearnBtn: true,
      noDataText: 'Nothing here',
      searchDelayTime: 200 // delay in ms

    };

    let selectRow = {
      mode: "radio",
      columnWidth: "40px",
      onSelect: this.handleRowSelect,
      clickToExpand: true,
    };


    return (
        <div>
          {console.log("props3", this.props.type)}
          {/*this.componentDidMount()*/}
          {/*console.log(this.props.test)*/}
          <BootstrapTable
              data={ this.state.data }
              keyField="id"
              pagination={ true }
              options={ options }
              search
              searchPlaceholder='What are u looking for..'
              selectRow={ selectRow }
              expandableRow={ this.isExpandableRow }
              expandComponent={ this.props.type==="bill"?this.expandComponentBill:this.expandComponent }
              exportCSV
              csvFileName="CSV_DATA.csv"
          >
            {tableBody}
          </BootstrapTable>

          <Row>
            &nbsp;&nbsp;&nbsp;
            {console.log("Selected row to edit/delete: " + this.state.selected)}
            <ModalWithForm buttonLabel={modalButtonLabel} type={modalType} mode={"insert"} color={"success"} row={this.state.selected} category={[]} handleNew={this.insertData}/>&nbsp;

            {/*<ModalWithForm buttonLabel={"Edit"} type={modalType} mode={"edit"} color={"warning"} row={this.state.selected} category={category} handleNew={this.insertData}/>&nbsp;*/}

            <Button color="danger" onClick={this.handleDeleteButtonClick}>
              Delete
            </Button>
            {console.log(typeof this.state.data[0])}
          </Row>
        </div>
    );
  }
}