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

function colorFormat(cell, row) {
  return <Badge style={{ backgroundColor: cell, color: cell }}>{cell}</Badge>;
}

function editRow(rowId) {
  /*clintJson({method: 'POST', path:"/api/getincomes"})*/
}
function deleteRow(rowId) {

}
function insertRow() {

}

export default class CustomPaginationTable extends React.Component {

    constructor(props) {
      super();
      this.state = {
          data: [],
          cellEditMode: "none",
          selected: -1,
          
      }
      this.refs = React.createRef();


      this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
      this.insertData = this.insertData.bind(this)
      this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this)
      this.handleRowSelect = this.handleRowSelect.bind(this)
    }

    
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
        this.setState((prevState) => {
            //console.log(prevState)
            return {
              data: this.state.data.push({
                id: 100,
                name: newData.name,
                category: newData.category,
                date: (newData.date.substring(8,10)+'.'+newData.date.substring(5,7)+'.'+newData.date.substring(0,4)),
                amount: newData.amount,
                color: newData.color,
                expand: true
              })
            }
        })
    }

/*
    newTry (newData) {
      return(
        {
            id:100,
            name: newData.name,
            category: newData.category,
            date: newData.date,
            amount: newData.amount,
            color: newData.color,
            expand: true
        }
      )
    }*/

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
    handleDeleteButtonClick() {
      let selectedId = this.state.selected // id to delete
      if(selectedId === -1)
        return
      let data = this.state.data
      let tableId = -1;
      for (var i=0; i<this.state.data.length; i++)
      {
          if(this.state.data[i].id == selectedId)
            tableId = i
      }
      data.splice(tableId, 1)
      this.setState({data: data})
      this.setState({selected: -1})
    }
    handleRowSelect(row) {
      this.setState((prevState) => { 
        return {selected: row.id}
        })
    }
  render() {
    console.log("Wyswietlam tabele")
    console.log(this.state.data[0])
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
        {dataField: "date", label: "Date", isKey: false, hidden: false},
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
      <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataSort>{foo.label}</TableHeaderColumn>))
    
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
      <BootstrapTable 
            data={ this.state.data }
            keyField="id"
            pagination={ true } 
            options={ options }   
            search
            searchPlaceholder='What are u looking for..'
            selectRow={ selectRow }
            expandableRow={ this.isExpandableRow }
            expandComponent={ this.expandComponent }
            exportCSV
            csvFileName="CSV_DATA.csv"
            > 
           {tableBody}
      </BootstrapTable>
      
      <Row>
        &nbsp;&nbsp;&nbsp;
        {console.log("Selected row to edit/delete: " + this.state.selected)}
        <ModalWithForm buttonLabel={modalButtonLabel} type={modalType} mode={"insert"} color={"success"} row={this.state.selected} category={category} handleNew={this.insertData}/>&nbsp;
        <ModalWithForm buttonLabel={"Edit"} type={modalType} mode={"edit"} color={"warning"} row={this.state.selected} category={category} handleNew={this.insertData}/>&nbsp;
        {/*<Button color="warning" onClick={() => this.handleEditButtonClick()}>
          Edit
        </Button>&nbsp;*/}
        <Button color="danger" onClick={this.handleDeleteButtonClick}>
          Delete
        </Button>
        {console.log(typeof this.state.data[0])}
      </Row>
    </div>
    );
  }
}