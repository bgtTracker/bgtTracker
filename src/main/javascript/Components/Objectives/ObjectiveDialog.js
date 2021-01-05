import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from"@material-ui/core/Button";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const theme = createMuiTheme();

const useStyles = makeStyles({
  smalleTextField: {
    height: 50
  },
  bigTextField: {
    height: 150,
    width: 470,
  },
  dialog: {
    height: 480,
    width: 600
  },
  row: {
    height: 60
  },
  BlankSpace: {
    height: 30
  },
  blandSpaceWithd: {
    width: 20
  },
  formControl: {
    minWidth: 220,
  },
});

export default function ObjectiveDialog(props) {
  const classes = useStyles();
  const maxWidth = "xl";
  const open = props.open;
  const [date, setDate] = React.useState(
    props.row.date
  );
  const [category, setCategory] = React.useState(props.row.category);
  const [name, setName] = React.useState(props.row.name);
  const [amount, setAmount] = React.useState(props.row.amount);
  const [description, setDescription] = React.useState(props.row.description);

  const handleDataChange = date => {
    setDate(date);
  };

  const handleClose = () => {
    props.handleClose();
  }

  const handleSave = () => {
    props.handleSave({
      name: name,
      amount: amount,
      description: description,
      date: date.getTime(),
      category: category
    });
    props.handleClose();
  }

  return (
    <div>
      <Dialog
        className={classes.dialogHeight}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Enter new name and last name
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column"  justify="space-around">
            <Grid container className={classes.row} spacing={1} direction={"row"} justify="space-around" alignItems="center" >
              <Grid item xs={6}>
                <TextField
                  className={classes.smalleTextField}
                  id="Name"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={classes.smalleTextField}
                  id="Amount"
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.BlankSpace}> </div>
            </Grid>
            <Grid container className={classes.row}  spacing={1} direction={"row"} justify="space-around" alignItems="center">
              <Grid item xs={6} >
                <form className={classes.container} noValidate>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker 
                    disableToolbar
                    variant="inline"
                    format="yyyy-dd-MM"
                    margin="normal"
                    id="demo-date-outlined"
                    inputVariant="outlined"
                    label="Date"
                    variant="outlined"
                    value={date}
                    onChange={handleDataChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>
              <Grid item xs={6} >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-category-outlined-label">Category</InputLabel>
                  <Select
                    labelId="demo-category-outlined-label"
                    id="demo-category-outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.BlankSpace}> </div>
            </Grid>
            <Grid item xs={12}>
            <TextField
              className={classes.bigTextField}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


