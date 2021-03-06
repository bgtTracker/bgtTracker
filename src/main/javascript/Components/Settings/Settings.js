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
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { set } from "date-fns";
import AuthService from "../../api/AuthService.js";
import ErrorCodeHandler from "../ErrorCodeHandler.js";
import CurrencySelect from "./CurrencySelect.js";
import { DarkThemeButton } from "../Misc/ColoredButtons.js";

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
  const [limit, setLimit] = useState(0);
  const [errorLimit, setErrorLimit] = useState(false);

  function HandleNamesChange() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const checkLimit = event => {
    if (isNaN(event.target.value)) {
      setErrorLimit(true);
    } else {
      setErrorLimit(false);
    }
    setLimit(event.target.value);
  };

  function handleClickClose() {
    setName(tempName);
    setLastName(tempLastName);
    setOpen(false);
    if (tempName !== name) {
      fetch("/api/user/first-name", {
        method: "POST",
        body: tempName,
        headers: AuthService.getAuthHeader()
      })
        .then(respone => {
          setName(tempName);
        })
        .catch(error => {
          ErrorCodeHandler(error.status);
        });
    }
    if (lastName !== tempLastName) {
      fetch("/api/user/last-name", {
        method: "POST",
        body: tempLastName,
        headers: AuthService.getAuthHeader()
      })
        .then(respone => {
          setLastName(tempLastName);
        })
        .catch(error => {
          ErrorCodeHandler(error.status);
        });
    }
  }

  function handlePassworChange() {
    setPassDialogOpen(false);
    let passwords = {
      oldPassword: password,
      newPassword: temppass
    };
    fetch("/api/user/password", {
      method: "POST",
      body: JSON.stringify(passwords),
      headers: new Headers({
        Authorization: "Bearer " + AuthService.getToken(),
        "Content-Type": "application/json"
      })
    })
      .then(respone => {})
      .catch(error => {
        ErrorCodeHandler(error.status);
      });
  }

  function handleLimitChange() {
    console.log("limit save");
    console.log(errorLimit);
    if (errorLimit === false) {
      console.log("limit save2");
      fetch("/api/limit", {
        method: "Put",
        headers: AuthService.getAuthHeader(),
        body: JSON.stringify(Math.floor(Number.parseFloat(limit) * 100))
      })
        .then(respone => {
          console.log(respone);
        })
        .catch(error => {
          console.log(error);
          ErrorCodeHandler(error.status);
        });
    }
  }

  useEffect(() => {
    fetch("/api/user/first-name", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => respone.text())
      .then(respone => {
        setName(respone);
        setTempName(respone);
      })
      .catch(error => {
        console.log(error);
        ErrorCodeHandler(error.status);
      });
    fetch("/api/user/last-name", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => respone.text())
      .then(respone => {
        setLastName(respone);
        setTempLastName(respone);
      })
      .catch(error => {
        ErrorCodeHandler(error.status);
      });
    fetch("/api/limit", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => respone.text())
      .then(respone => {
        setLimit(respone / 100);
      })
      .catch(error => {
        ErrorCodeHandler(error.status);
      });
  }, []);

  const trigetTest = () => {
    fetch("/api/notitest", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(respone => {})
      .catch(error => {
        console.log(error);
        ErrorCodeHandler(error.status);
      });
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
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
                      <DialogTitle id="max-width-dialog-title">Enter new name and last name</DialogTitle>
                      <DialogContent>
                        <Grid container spacing={1} justify="space-around">
                          <Grid item>
                            <TextField
                              id="First Name"
                              label="First Name"
                              variant="outlined"
                              value={tempName}
                              onChange={e => setTempName(e.target.value)}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="Last Name"
                              label="Last Name"
                              variant="outlined"
                              value={tempLastName}
                              onChange={e => setTempLastName(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <DarkThemeButton onClick={handleClickClose} color="primary">
                          Done
                        </DarkThemeButton>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>

              <Divider flexItem variant="middle" />

              <Grid item xs={12}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                  <Grid item>
                    <Button onClick={() => setPassDialogOpen(true)}>Change password</Button>
                    <Dialog
                      maxWidth={maxWidth}
                      open={passDialogOpen}
                      onClose={() => setPassDialogOpen(false)}
                      aria-labelledby="max-width-dialog-title"
                    >
                      <DialogTitle id="max-width-dialog-title">Enter old and new password</DialogTitle>
                      <DialogContent>
                        <Grid container spacing={1} justify="space-around">
                          <Grid item>
                            <TextField
                              id="password"
                              label="Old password"
                              type="password"
                              variant="outlined"
                              onChange={e => setPassword(e.target.value)}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="password"
                              label="New password"
                              type="password"
                              variant="outlined"
                              onChange={e => setTempPass(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <DarkThemeButton onClick={handlePassworChange} color="primary">
                          Done
                        </DarkThemeButton>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>

              <Divider flexItem variant="middle" />
              <Grid item xs={12}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                  <Grid item xs={4}>
                    <TextField
                      id="limit"
                      label="Limit"
                      variant="outlined"
                      error={errorLimit}
                      value={limit}
                      onChange={checkLimit}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={handleLimitChange}>Change Goal</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                  <CurrencySelect />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={trigetTest}>Triger notifications</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
