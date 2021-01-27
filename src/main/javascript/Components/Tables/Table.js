import React from "react";
import { BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton, BSTable } from "react-bootstrap-table";
import { Button } from "reactstrap";
import ModalWithForm from "./ModalWithForm";
import { Container, Row, Col } from "reactstrap";
import { Badge } from "reactstrap";
import { Input, FormGroup, Label } from "reactstrap";

import "../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import clientJson from "../../clientJson";
import AuthService from "../../api/AuthService";

/**
 * Function colorFormat
 * params:
 * cell - content of cell to format
 * row - whole row 
 * returns reactstrap Badge in given color 
 */
function colorFormat(cell, row) {
  return <Badge style={{ backgroundColor: cell, color: cell }}>category color {cell}</Badge>;
}

/**
 * Function amountFormat
 * params:
 * cell - content of cell to format
 * row - whole row 
 * returns formated amount to two decimal places
 * 10000 -> 100.00
 */
function amountFormat(cell, row) {
  var t = (parseFloat(cell) / 100).toFixed(2);
  return t;
}
/**
 * Function sortData
 * params:
 * c first cell to sort
 * d second cell to sort
 * order - sorting order desc or asc
 * 
 * function used in sorting table
 * returns -1 if c is bigger 0 if equal and 1 if less then d for desc order
 */
function sortData(c, d, order) {
  var a = c.date;
  var b = d.date;

  if (order === "desc") {
    if (a.slice(6, 10) > b.slice(6, 10)) {
      return -1;
    } else if (a.slice(6, 10) < b.slice(6, 10)) {
      return 1;
    } else {
      if (a.slice(3, 5) > b.slice(3, 5)) {
        return -1;
      } else if (a.slice(3, 5) < b.slice(3, 5)) {
        return 1;
      } else {
        if (a.slice(0, 2) > b.slice(0, 2)) {
          return -1;
        } else if (a.slice(0, 2) < b.slice(0, 2)) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  } else {
    if (a.slice(6, 10) < b.slice(6, 10)) {
      return -1;
    } else if (a.slice(6, 10) > b.slice(6, 10)) {
      return 1;
    } else {
      if (a.slice(3, 5) < b.slice(3, 5)) {
        return -1;
      } else if (a.slice(3, 5) > b.slice(3, 5)) {
        return 1;
      } else {
        if (a.slice(0, 2) < b.slice(0, 2)) {
          return -1;
        } else if (a.slice(0, 2) > b.slice(0, 2)) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }
}


/**
 * CustomPaginationTable class
 * creates react table object with proper pagination 
 * params:
 * type:  [income|expense|bill|category]
 * subtype(optional): [income|expense]
 * handleDel: async function to delete proper object in database
 */
export default class CustomPaginationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cellEditMode: "none",
      selected: -1,
      selectedContent: []
    };
    this.refs = React.createRef();

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.insertData = this.insertData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handlePayBillButton = this.handlePayBillButton.bind(this);

  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    if (this.props.type === "income") {
      this.setState(() => {
        clientJson({
          method: "GET",
          path: "/api/getIncomes/",
          headers: AuthService.getAuthHeader()
        }).then(response => {
          this.setState({ data: response.entity.income });
        });
      });
      //console.log("Pobrane dane to", this.state.data)
    } else if (this.props.type === "expense") {
      this.setState(() => {
        clientJson({
          method: "GET",
          path: "/api/getExpenses/",
          headers: AuthService.getAuthHeader()
        }).then(response => {
          this.setState({ data: response.entity.expense });
        });
      });
    } else if (this.props.type === "bill") {
      this.setState(() => {
        clientJson({
          method: "GET",
          path: "/api/getBills/",
          headers: AuthService.getAuthHeader()
        }).then(response => {
          this.setState({ data: response.entity.bill });
        });
      });
    } else {
      if (this.props.subType === "income") {
        this.setState(() => {
          clientJson({
            method: "GET",
            path: "/api/getIncomeCategory/",
            headers: AuthService.getAuthHeader()
          }).then(response => {
            this.setState({ data: response.entity.category });
          });
        });
      } else {
        this.setState(() => {
          clientJson({
            method: "GET",
            path: "/api/getExpenseCategory/",
            headers: AuthService.getAuthHeader()
          }).then(response => {
            this.setState({ data: response.entity.category });
          });
        });
      }
    }
  }

  handlePayBillButton() {
    console.log("this.state.selected", this.state.selected);
    console.log("this.state.selectedContenet", this.state.selectedContent.isPaid);
    let selectedId = this.state.selected;
    if (selectedId === -1) {
      alert("You have to choose bill to pay!");
      return;
    }
    if (this.state.selectedContent.isPaid === true) {
      alert("This bill is already paid!");
      return;
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    console.log("today", today);
    this.setState(() => {
      clientJson({
        method: "POST",
        path: "/api/payBill/",
        headers: AuthService.getAuthHeader(),
        params: {
          id: this.state.selectedContent.id,
          date: today
        }
      }).then(() => {
        alert("Bill paid :)");
        this.fetchData();
      });
    });
  }
  updateData(id, newData) {
    if (this.props.type === "income") {
      this.setState(prevState => {
        clientJson({
          method: "POST",
          path: "/api/updateIncome/",
          headers: AuthService.getAuthHeader(),
          params: {
            id: id,
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount,
            date: newData.date,
            note: newData.note
          }
        })
          .then(response => {})
          .then(response => {
            this.fetchData();
          });
      });
    } else if (this.props.type === "expense") {
      this.setState(prevState => {
        clientJson({
          method: "POST",
          path: "/api/updateExpense/",
          headers: AuthService.getAuthHeader(),
          params: {
            id: id,
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount,
            date: newData.date,
            note: newData.note
          }
        }).then(response => {
          this.fetchData();
        });
      });
    } else if (this.props.type === "bill") {
      this.setState(prevState => {
        clientJson({
          method: "POST",
          path: "/api/updateBill/",
          headers: AuthService.getAuthHeader(),
          params: {
            id: id,
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount,
            dueDate: newData.date,
            note: newData.note,
            bankNumber: newData.bankAccount
          }
        }).then(response => {
          this.fetchData();
        });
      });
    } else if (this.props.type === "category") {
      if (this.props.subType === "income") {
        this.setState(() => {
          clientJson({
            method: "POST",
            path: "/api/updateIncomeCategory/",
            headers: AuthService.getAuthHeader(),
            params: {
              id: id,
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then(response => {
            this.fetchData();
          });
        });
      } else if (this.props.subType === "expense") {
        this.setState(() => {
          clientJson({
            method: "POST",
            path: "/api/updateExpenseCategory/",
            headers: AuthService.getAuthHeader(),
            params: {
              id: id,
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then(response => {
            this.fetchData();
          });
        });
      } else {
        console.log("ERROR");
      }
    } else {
      console.log("ERROR");
    }
  }
  insertData(newData) {
    if (this.props.type === "income") {
      this.setState(prevState => {
        var newId;
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
        })
          .then(response => {
            newId = response.entity;
          })
          .then(response => {
            this.fetchData();
          });
      });
    } else if (this.props.type === "expense") {
      this.setState(prevState => {
        var newId;
        clientJson({
          method: "POST",
          path: "/api/newExpense/",
          headers: AuthService.getAuthHeader(),
          params: {
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount,
            date: newData.date,
            note: newData.note
          }
        }).then(response => {
          this.fetchData();
        });
      });
    } else if (this.props.type === "bill") {
      this.setState(prevState => {
        var newId;
        clientJson({
          method: "POST",
          path: "/api/newBill/",
          headers: AuthService.getAuthHeader(),
          params: {
            name: newData.name,
            category_id: newData.category,
            amount: newData.amount,
            dueDate: newData.date,
            note: newData.note,
            bankNumber: newData.bankAccount
          }
        }).then(response => {
          this.fetchData();
        });
      });
    } else if (this.props.type === "category") {
      if (this.props.subType === "income") {
        this.setState(() => {
          var newId;
          clientJson({
            method: "POST",
            path: "/api/newIncomeCategory/",
            headers: AuthService.getAuthHeader(),
            params: {
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then(response => {
            this.fetchData();
          });
        });
      } else if (this.props.subType === "expense") {
        this.setState(() => {
          var newId;
          clientJson({
            method: "POST",
            path: "/api/newExpenseCategory/",
            headers: AuthService.getAuthHeader(),
            params: {
              name: newData.name,
              color: newData.color,
              note: newData.note
            }
          }).then(response => {
            this.fetchData();
          });
        });
      } else {
        console.log("Wystapil problem");
      }
    } else {
      console.log("Wystapil problem");
    }
  }


  isExpandableRow(row) {
    /* tells if row is expandable always returns true cuz all rows are*/
    return true;
  }

  expandComponent(row) {
    return (
      <div>
        <FormGroup>
          <Label>Note</Label>
          <Input type="textarea" name="note" id="note" value={row.note} disabled />
        </FormGroup>
      </div>
    );
  }

  expandComponentBill(row) {
    console.log("ROW data", row);
    return (
      <div>
        <div>
          <Row>
            <Col xs="3">
              <FormGroup>
                <Label>Last payment:</Label>
                <Input type="text" name="date" id="date" value={row.paymentDay} disabled />
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <Label>State</Label>
                <Input type="text" name="state" id="state" value={row.isPaid == true ? "PAID" : "NOT PAID"} disabled />
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Bank account</Label>
                <Input type="text" name="account" id="account" value={row.bankAccount} disabled />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Note</Label>
            <Input type="textarea" name="note" id="note" value={row.note} disabled />
          </FormGroup>
        </div>
      </div>
    );
  }
  handleEditButtonClick() {
    let selectedId = this.state.selected;
    if (selectedId === -1) {
      alert("You have to choose row to edit!");
      return;
    }
  }
  handleDeleteButtonClick() {
    let selectedId = this.state.selected; // id to delete
    if (selectedId === -1) {
      alert("You have to choose row");
      return;
    }
    let data = this.state.data;
    let tableId = -1;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == selectedId) tableId = i;
    }

    this.props.handleDel(selectedId);
    data.splice(tableId, 1);
    this.setState({ data: data });
    this.setState({ selected: -1 });

  }
  handleRowSelect(row) {
    this.setState(prevState => {
      return { selected: row.id, selectedContent: row };
    });
  }


  render() {

    const type = this.props.type;

    let rows;
    let modalType;
    let modalLabel;
    let modalButtonLabel;

    if (type === "income") {
      rows = [
        { dataField: "id", label: "ID", isKey: true, hidden: true },
        {
          dataField: "name",
          label: "Income Name",
          isKey: false,
          hidden: false
        },
        {
          dataField: "category",
          label: "Category",
          isKey: false,
          hidden: false
        },
        { dataField: "date", label: "Date", isKey: false, hidden: false },
        { dataField: "amount", label: "Amount", isKey: false, hidden: false }
      ];
      modalButtonLabel = "Add new Income";
      modalLabel = "New income";
      modalType = "income";
    } else if (type === "expense") {
      rows = [
        { dataField: "id", label: "ID", isKey: true, hidden: true },
        {
          dataField: "name",
          label: "Expense Name",
          isKey: false,
          hidden: false
        },
        {
          dataField: "category",
          label: "Category",
          isKey: false,
          hidden: false
        },
        { dataField: "date", label: "Date", isKey: false, hidden: false }, //zmiana
        { dataField: "amount", label: "Amount", isKey: false, hidden: false }
      ];
      modalButtonLabel = "Add new Expense";
      modalLabel = "New Expense";
      modalType = "expense";
    } else if (type === "bill") {
      rows = [
        { dataField: "id", label: "ID", isKey: true, hidden: true },
        { dataField: "name", label: "Bill Name", isKey: false, hidden: false },
        {
          dataField: "category",
          label: "Category",
          isKey: false,
          hidden: false
        },
        { dataField: "date", label: "Payment to", isKey: false, hidden: false },
        { dataField: "amount", label: "Amount", isKey: false, hidden: false }
      ];
      modalButtonLabel = "Add new bill";
      modalLabel = "New bill";
      modalType = "bill";
    } else {
      rows = [
        { dataField: "id", label: "ID", isKey: true, hidden: true },
        { dataField: "name", label: "Category", isKey: false, hidden: false },
        { dataField: "color", label: "Color", isKey: false, hidden: false }
      ];
      modalButtonLabel = "Add new Category";
      modalLabel = "New category";
      modalType = "category";
    }

    const tableBody = rows.map(foo =>
      foo.dataField === "color" ? (
        <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataFormat={colorFormat}>
          {foo.label}
        </TableHeaderColumn>
      ) : foo.dataField === "date" ? (
        <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataSort={true} sortFunc={sortData}>
          {foo.label}
        </TableHeaderColumn>
      ) : foo.dataField === "amount" ? (
        <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataFormat={amountFormat}>
          {foo.label}
        </TableHeaderColumn>
      ) : (
        <TableHeaderColumn dataField={foo.dataField} hidden={foo.hidden} dataSort={true}>
          {foo.label}
        </TableHeaderColumn>
      )
    );

    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "100",
          value: 100
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 5, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: "<", // Previous page button text
      nextPage: ">", // Next page button text
      firstPage: "<<", // First page button text
      lastPage: ">>", // Last page button text
      paginationPosition: "bottom", // default is bottom, top and both is all available
      clearnBtn: true,
      noDataText: "Nothing here",
      searchDelayTime: 200 // delay in ms
    };

    let selectRow = {
      mode: "radio",
      columnWidth: "40px",
      onSelect: this.handleRowSelect,
      clickToExpand: true
    };

    return (
      <div>
        <BootstrapTable
          data={this.state.data}
          keyField="id"
          pagination={true}
          options={options}
          search
          searchPlaceholder="What are u looking for.."
          selectRow={selectRow}
          expandableRow={this.isExpandableRow}
          expandComponent={this.props.type === "bill" ? this.expandComponentBill : this.expandComponent}
          exportCSV
          csvFileName="CSV_DATA.csv"
        >
          {tableBody}
        </BootstrapTable>

        <Row>
          &nbsp;&nbsp;&nbsp;
          <ModalWithForm
            buttonLabel={modalButtonLabel}
            type={modalType}
            mode={"insert"}
            color={"success"}
            row={this.state.selected}
            category={[]}
            handleNew={this.insertData}
          />
          &nbsp;
          <ModalWithForm
            buttonLabel={"Edit"}
            type={modalType}
            mode={"edit"}
            color={"warning"}
            row={this.state.selected}
            rowContent={this.state.selectedContent}
            category={[]}
            handleNew={this.updateData}
          />
          &nbsp;
          <Button color="danger" onClick={this.handleDeleteButtonClick}>
            Delete
          </Button>
          {this.props.type === "bill" && (
            <div style={{ position: "absolute", right: 15 }}>
              <Button color="primary" onClick={this.handlePayBillButton}>
                Pay bill
              </Button>
            </div>
          )}
        </Row>
      </div>
    );
  }
}
