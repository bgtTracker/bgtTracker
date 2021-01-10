import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

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
        <TableCell component="th" id={labelId} scope="row" padding="none" onClick={event => setOpen(!open)}>
          {row.name}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.date.toDateString()}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.category}
        </TableCell>
        <TableCell align="right" onClick={event => setOpen(!open)}>
          {row.amount}
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
