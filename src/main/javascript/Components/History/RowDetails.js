import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";

export default function Row(props) {
  const row = props.row;
  let index = props.index;
  const [open, setOpen] = React.useState(false);

  const isItemSelected = props.isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
            onClick={event => props.handleCheckBoxClick(event, row.id)}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          onClick={event => setOpen(!open)}
        >
          {row.date.toDateString()}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.expenses}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.income}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.balance}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          onClick={event => setOpen(!open)}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map(details => (
                    <TableRow key={details.id}>
                      <TableCell component="th" scope="row">
                        {details.date.toLocaleString()}
                      </TableCell>
                      <TableCell>{details.name}</TableCell>
                      <TableCell align="right">{details.type}</TableCell>
                      <TableCell align="right">{details.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
