import React from 'react';
import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton, BSTable} from 'react-bootstrap-table';
import { Button } from 'reactstrap'
import ModalWithForm from "./ModalWithForm"
import { Container, Row, Col } from 'reactstrap';
import { Badge } from 'reactstrap';


function colorFormat(cell, row) {
return (<Badge style={{backgroundColor: cell, color: cell}}>{cell}</Badge>)
}  

export default class CustomPaginationTable extends React.Component {

    constructor(props) {
      super();
      this.state = {
          data: "",
          cellEditMode: "none",
          
      }
      this.refs = React.createRef();
      this.handleEditButtonClick2 = this.handleEditButtonClick2.bind(this)
      this.insertData2 = this.insertData2.bind(this)
    }

  
    expandComponent(row) {
      return (
        <BSTable data={ row.expand } />
      );
    }
    createCustomDeleteButton = (onClick) => {
        return (
          <button style={ { color: 'red' } } onClick={ onClick }>Delete rows</button>
        )}
    handleInsertButtonClick = (onClick) => {
            // Custom your onClick event here,
            // it's not necessary to implement this function if you have no any process before onClick
            console.log('This is my custom function for InserButton click event');
            
          }
    handleEditButtonClick = (onClick) => {
      // Custom your onClick event here,
      // it's not necessary to implement this function if you have no any process before onClick
      console.log('Edit button clicked');
      this.state.cellEditMode = "dbclick"
    }
    handleEditButtonClick2() { // zle :(
        this.setState((prevState) => {
          console.log(prevState)
          let ret
          if(prevState.cellEditMode === "dbclick"){
            console.log("tak")
            alert("Edit mode disactivated")
            ret = {cellEditMode: "none"}
          } else {
            alert("Edit mode activated")
            console.log("taktak")
            ret = {cellEditMode: "dbclick"}
          }
          return ret
          
        })
    }
    createCustomInsertButton = (onClick) => {
            return (
              <InsertButton
                btnText='CustomInsertText'
                btnContextual='btn-success'
                className='my-custom-class'
                btnGlyphicon='glyphicon-edit'
                onClick={ () => this.handleInsertButtonClick(onClick) }/>
            );
          }
    handleModal(info) {
        console.log(info)
    }

    insertData2(newData) {
        this.setState((prevState) => {
            console.log(prevState)
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
    }
    
  render() {

    const type = this.props.type
    this.state.data =  this.props.data
    var category = this.props.category
    console.log("tabela")
    console.log(this.state.data)

    var rows
    var modalType
    var modalLabel
    var modalButtonLabel
    var modalRet = {}
    
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
      <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden}>{foo.label}</TableHeaderColumn>))
    
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
      deleteText: 'Custom Delete Text',
      clearnBtn: true,
      noDataText: 'Coś tu za cicho',
      searchDelayTime: 200 // delay in ms
      
    };

    let selectRow = {
        mode: 'none',  // multi select
        clickToSelectAndEditCell: true,
        columnWidth: '40px'
      };

    const cellEdit = {
        mode: this.state.cellEditMode // double click cell to edit dbclick
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
            cellEdit={ cellEdit }
            height='272'
            expandComponent={ this.expandComponent }
            exportCSV
            csvFileName="Income_table.csv"
            > 
           {tableBody}
      </BootstrapTable>
      
      <Row>
        &nbsp;&nbsp;&nbsp;
        <ModalWithForm buttonLabel={modalButtonLabel} type={modalType} category={category} handleNew={this.insertData2}/>&nbsp;
        <Button color="warning" onClick={ () => (this.handleEditButtonClick2())}>Edit</Button>
      </Row>
      
      
      
    </div>
    );
  }
}
