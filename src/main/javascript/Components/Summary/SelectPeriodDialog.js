import React, {useState, useEffect} from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';;
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function SelectPeriodDialog(props) {
  const classes = useStyles();
  const maxWidth = 400;
  const [open, setOpen] = useState(true);
  const [fromDate, setFromDate] = useState(new Date('2014-08-18T21:11:54'));
  const [toDate, setToDate] = useState(new Date('2016-08-18T21:11:54'));

  const handleFromDataChange = (date) => {
    setFromDate(date);
  };

  const handleToDataChange = (date) => {
    setToDate(date);
  };
  

  const handleClose = () => {
    props.changeCustomPeriodSelected();
    props.saveData(fromDate, toDate);
    setOpen(false);
  };



  return (
    <React.Fragment>
      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Select Period</DialogTitle>
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-dd-MM"
              margin="normal"
              id="date-picker-inline"
              label="From Date"
              value={fromDate}
              onChange={handleFromDataChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
           <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-dd-MM"
              margin="normal"
              id="date-picker-inline"
              label="To Date"
              value={toDate}
              onChange={handleToDataChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


SelectPeriodDialog.propTypes = {
    changeCustomPeriodSelected: PropTypes.func.isRequired,
    saveData: PropTypes.func.isRequired,

}