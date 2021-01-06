import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CSVexporter from "../History/CSVexporter.js";
import RowDetails from "./RowDetails.js";
import RowNoDetails from "../History/Row.js";
import DataConverter from "../History/DataConveret.js";
import ObjectiveDialog from "./ObjectiveDialog.js"
import AuthService from "../../api/AuthService.js";

const money = 10000;

const theme = createMuiTheme();

function createDetails(id, date, type, name, amount) {
  return { id, date, type, name, amount };
}

function createData(id, name, date, category, amount, d) {
  return {
    id,
    name,
    date,
    category,
    amount,
    description: "testtest"
  };
}

let rows = [
  createData(101, "test", new Date(), "3000", 7000, 4000),
  createData(102, "test", new Date(), "2000", 1000, -100),
  createData(103, "test", new Date(), '1000', 2000, 1000),
  createData(104, "test", new Date(), '1500', 3000, 1500),
  createData(105, "test", new Date(), '3000', 7000, 4000),
  createData(106, "test", new Date(), '2000', 1000, -100),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

let headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "date", numeric: false, disablePadding: false, label: "End date" },
  { id: "category", numeric: false, disablePadding: false, label: "Category"}, //?? acount numberic or not
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [downloadCVS, setDownloadCSV] = React.useState(false);
  const [data, setData] = React.useState();
  const [downloaded, sedDownloaded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  let row = {
    id: -1,
    name: "Default",
    amount: 1000,
    date: new Date(),
    category: 1,
    description: "New description"
  }


  function HandleDownloadCSV() {
    let d = DataConverter(headCells, rows, props.selected);
    setData(d);
    setDownloadCSV(true);
  }

  const onDownloaded = () => {
    setDownloadCSV(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  }

  const addObjective = (toSave) => {
    props.addObjective(toSave);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Objectives
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Export to csv">
          <IconButton aria-label="export" onClick={HandleDownloadCSV}>
            <ImportExportIcon />
            {downloadCVS === true && downloaded === false ? (
              <CSVexporter
                data={data.data}
                labels={data.labels}
                onDownloaded={onDownloaded}
              />
            ) : (
              <div />
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <div>
        <Tooltip title="Add new objective">
          <IconButton aria-label="objectives" onClick={e =>{ setOpenDialog(true)}}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <ObjectiveDialog open={openDialog} row={row} handleClose={closeDialog} handleSave={addObjective}/>
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  addObjective: PropTypes.func.isRequired,
  // getDataForCVS: PropTypes.func.isRequired,
};

// EnhancedTableToolbar.defaultProps = {
//   lables: [date, ]
// }

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function ObjectivesTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if (props.headCells != undefined) headCells = props.headCells;

  if (props.rows != undefined) rows = props.rows;

  let Row;
  if (props.details) Row = RowDetails;
  else Row = RowNoDetails;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleCheckBoxClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const editObjective = (toSave) =>{
      props.editObjective(toSave);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          addObjective={props.addObjective}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="historyTable"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Row
                    key={row.id}
                    row={row}
                    index={index}
                    isSelected={isSelected}
                    handleCheckBoxClick={handleCheckBoxClick}
                    handleSave={editObjective}
                    handleDelete={props.deleteObjective}
                    money={money}
                  />
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

ObjectivesTable.propsTypes = {
  details: PropTypes.bool.isRequired
};