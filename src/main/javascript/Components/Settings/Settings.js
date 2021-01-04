import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { set } from "date-fns";

const theme = createMuiTheme();

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  root: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(1.5)
    },
    "& hr": {
      margin: theme.spacing(0, 0.5)
    }
  }
}));

export default function Settings() {
  const maxWidth = "xl";
  const [password, setPassword] = useState();
  const [name, setName] = useState("Billy");
  const [lastName, setLastName] = useState("Herrington");

  const [tempName, setTempName] = useState("Billy");
  const [tempLastName, setTempLastName] = useState("Herrington");
  const [temppass, setTempPass] = useState("temp");

  const [open, setOpen] = useState(false);
  const [passDialogOpen, setPassDialogOpen] = useState(false);
  const [goal, setGoal] = useState(5000);

  function HandleNamesChange() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickClose() {
    setName(tempName);
    setLastName(tempLastName);
    setOpen(false);
  }

  function handlePassworChange() {
    setPassword(temppass);
    setPassDialogOpen(false);
  }

  function handleGoalChange() {
    setPassword(temppass);
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={4}>
                    <p>
                      First name: {name} Last name: {lastName}
                    </p>
                  </Grid>
                  <Grid item>
                    <Button onClick={HandleNamesChange}>Change</Button>
                    <Dialog
                      maxWidth={maxWidth}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="max-width-dialog-title"
                    >
                      <DialogTitle id="max-width-dialog-title">
                        Enter new name and last name
                      </DialogTitle>
                      <DialogContent>
                        <Grid container justify="space-around">
                          <TextField
                            id="First Name"
                            label="First Name"
                            variant="outlined"
                            value={tempName}
                            onChange={e => setTempName(e.target.value)}
                          />
                          <TextField
                            id="Last Name"
                            label="Last Name"
                            variant="outlined"
                            value={tempLastName}
                            onChange={e => setTempLastName(e.target.value)}
                          />
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                          Done
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>

              <Divider flexItem variant="middle" />

              <Grid item xs={12}>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Button onClick={() => setPassDialogOpen(true)}>
                      Change password
                    </Button>
                    <Dialog
                      maxWidth={maxWidth}
                      open={passDialogOpen}
                      onClose={() => setPassDialogOpen(false)}
                      aria-labelledby="max-width-dialog-title"
                    >
                      <DialogTitle id="max-width-dialog-title">
                        Enter new password
                      </DialogTitle>
                      <DialogContent>
                        <Grid container justify="space-around">
                          <TextField
                            id="Password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={e => setTempPass(e.target.value)}
                          />
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handlePassworChange} color="primary">
                          Done
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>

              <Divider flexItem variant="middle" />
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={4}>
                    <TextField
                      id="goal"
                      label="goal"
                      variant="outlined"
                      value={goal}
                      onChange={e => setGoal(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={handleGoalChange}>Change Goal</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
