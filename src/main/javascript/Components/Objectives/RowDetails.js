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
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import ObjectiveDialog from "./ObjectiveDialog.js";
import clientJson from "../../clientJson.js";
import AuthService from "../../api/AuthService.js";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={80}>
        <Typography variant="body2" component="div">
          Progress:
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

export default function Row(props) {
  const row = props.row;
  let index = props.index;
  const [open, setOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  let editDialogOpenTemp = editDialogOpen;

  const handleClose = () => {
    if (editDialogOpenTemp === false) {
      setOpen(!open);
    }
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
  };

  const handleSave = toSave => {
    props.handleSave(toSave);
  };

  const handleOpenEdit = () => {
    editDialogOpenTemp = true;
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    props.handleDelete(row.id);
  };

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
        <TableCell component="th" id={labelId} scope="row" padding="none" onClick={handleClose}>
          {row.name}
        </TableCell>
        <TableCell align="right" onClick={handleClose}>
          {row.date.toDateString()}
        </TableCell>
        <TableCell align="right" onClick={handleClose}>
          {row.priority}
        </TableCell>
        <TableCell align="right" onClick={handleClose}>
          {row.category}
        </TableCell>
        <TableCell align="right" onClick={handleClose}>
          <CircularProgressWithLabel value={(row.amount / props.money) * 100} />
        </TableCell>
        <TableCell align="right" onClick={handleClose}>
          {row.amount}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} onClick={handleClose}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" align="center">
                Description: {row.description}
              </Typography>
              <LinearProgressWithLabel value={(row.amount / props.money) * 100} />
              <Grid container direction={"row"} justify="space-evenly" alignItems="center">
                <Grid item>
                  <Button onClick={handleOpenEdit}>Edit</Button>
                  <ObjectiveDialog
                    open={editDialogOpen}
                    row={row}
                    handleClose={handleCloseEdit}
                    handleSave={handleSave}
                  />
                </Grid>
                <Grid item>
                  <Button>Confirm</Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleDelete}>Delete</Button>
                </Grid>
              </Grid>
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
  index: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired
};
