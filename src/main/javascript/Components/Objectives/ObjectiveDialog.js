import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import AuthService from "../../api/AuthService.js";
import { Skeleton } from "@material-ui/lab";
import ErrorCodeHandler from "../ErrorCodeHandler.js";
import { DarkThemeButton } from "../Misc/ColoredButtons.js";

const useStyles = makeStyles(theme => ({
  smalleTextField: {
    height: 50
  },
  bigTextField: {
    height: 150,
    width: 470
  },
  nameTextFile: {
    height: 50,
    width: 470
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
    minWidth: 220
  }
}));

export default function ObjectiveDialog(props) {
  const classes = useStyles();
  const maxWidth = "xl";
  const open = props.open;
  const [date, setDate] = React.useState(props.row.date);
  const [category, setCategory] = React.useState(props.row.categoryId);
  const [name, setName] = React.useState(props.row.name);
  const [amount, setAmount] = React.useState(props.row.amount);
  const [description, setDescription] = React.useState(props.row.description);
  const [priority, setPriority] = React.useState(props.row.priority);
  const [categories, setCategories] = React.useState();
  const [amountError, setAmountError] = React.useState(false);
  const [priError, setPriError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [errorCategory, setCatError] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/getExpenseCategory", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(res => res.json())
      .then(res => {
        if (res.category === undefined || res.category.length === 0) {
          console.log("caterror");
          setCatError(true);
        }
        console.log(res);
        setCategories(res.category);
      })
      .catch(e => {
        ErrorCodeHandler(e.status);
      });
  }, []);

  const handleDataChange = date => {
    setDate(date);
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleSave = () => {
    if (!amountError && !priError && !descriptionError && !nameError) {
      props.handleSave({
        id: props.row.id,
        name: name,
        amount: Math.floor(Number.parseFloat(amount) * 100),
        description: description,
        date: date.getTime(),
        categoryId: Number.parseInt(category),
        priority: Number.parseInt(priority)
      });
      props.handleClose();
    } else {
      // to do notifications that cannot save with error
    }
  };

  const checkAmount = event => {
    if (isNaN(event.target.value)) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
    setAmount(event.target.value);
  };

  const checkPri = event => {
    if (isNaN(event.target.value)) {
      setPriError(true);
    } else {
      setPriError(false);
    }
    setPriority(event.target.value);
  };

  const checkDecription = event => {
    if (event.target.value.length > 255) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setDescription(event.target.value);
  };

  const checkName = event => {
    if (event.target.value.length > 50) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(event.target.value);
  };

  const redirectToExpensePage = () => {
    if (typeof window !== "undefined") {
      window.location.replace("/app/expenses");
    }
  };

  return (
    <div>
      {errorCategory ? (
        <div>
          <Dialog
            className={classes.dialogHeight}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Error with categories</DialogTitle>
            <DialogContent>
              <Grid container justify="space-between">
                <Grid item xs={12}>
                  <h3> Add category before adding objective, you can do that in expenses page</h3>
                </Grid>
                <Grid item xs={6}>
                  <DarkThemeButton fullWidth onClick={redirectToExpensePage} color="primary">
                    Go to expense page
                  </DarkThemeButton>
                </Grid>
                <Grid item xs={6}>
                  <DarkThemeButton fullWidth onClick={handleClose} color="primary">
                    Close
                  </DarkThemeButton>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Dialog
            className={classes.dialogHeight}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">Objective:</DialogTitle>
            <DialogContent>
              <Grid container direction="column" justify="space-around">
                <Grid
                  container
                  className={classes.row}
                  spacing={1}
                  direction={"row"}
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <TextField
                      className={classes.smalleTextField}
                      id="Piority"
                      label="Piority"
                      variant="outlined"
                      value={priority}
                      error={priError}
                      helperText={"Must be a number"}
                      onChange={checkPri}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.smalleTextField}
                      id="Amount"
                      label="Amount"
                      variant="outlined"
                      value={amount}
                      error={amountError}
                      helperText={"Must be a number"}
                      onChange={checkAmount}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.BlankSpace}> </div>
                </Grid>
                <Grid
                  container
                  className={classes.row}
                  spacing={1}
                  direction={"row"}
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-category-outlined-label">Category</InputLabel>
                      <Select
                        labelId="demo-category-outlined-label"
                        id="demo-category-outlined"
                        value={category}
                        onChange={e => {
                          console.log(e.target.value);
                          setCategory(e.target.value);
                        }}
                        label="Category"
                      >
                        {categories === undefined ? (
                          <Skeleton animation="wave" variant="react" />
                        ) : (
                          categories.map(element => (
                            <MenuItem key={element.id} value={element.id}>
                              {element.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.BlankSpace}> </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.nameTextFile}
                    id="Name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    helperText="Max 50 characters"
                    error={nameError}
                    onChange={checkName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.BlankSpace}> </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.bigTextField}
                    id="outlined-multiline-static"
                    label="Descriptions"
                    multiline
                    error={descriptionError}
                    helperText="Max 255 characters"
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={checkDecription}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <DarkThemeButton fullWidth onClick={handleSave} color="primary">
                Save
              </DarkThemeButton>
              <DarkThemeButton fullWidth onClick={handleClose} color="primary">
                Cancel
              </DarkThemeButton>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
