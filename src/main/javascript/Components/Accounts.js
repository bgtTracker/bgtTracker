import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import AuthService from "../api/AuthService";
import ErrorCodeHandling from "./ErrorCodeHandler";
import { DarkThemeButton } from "./Misc/ColoredButtons.js";

const useStyles = makeStyles(theme => ({
  gridItem: {
    maxWidth: "400px"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),

    "&:hover": {
      backgroundColor: theme.palette.grey[100]
    }
  },
  paperSelected: {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[200],

    "&:hover": {
      backgroundColor: theme.palette.grey[300]
    }
  },
  balance: {
    fontSize: "50px",
    marginTop: "20px",
    marginBottom: "20px"
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function EditAccountDialog({ accounts, setAccounts, accIndex, banks, setBanks, open, onClose, actionName }) {
  const onClickAccept = async () => {
    let bankName = document.getElementById("dialog-bank").value;
    let accNumber = document.getElementById("dialog-number").value;
    let accBalance = document.getElementById("dialog-balance").value * 100;

    let bank = banks.find(b => b.name === bankName);
    if (bank == null) {
      bank = { id: 0, name: bankName };
    }

    if (accIndex >= 0) {
      let accountsCopy = [...accounts];
      accountsCopy[accIndex].bank = bank;
      accountsCopy[accIndex].number = accNumber;
      accountsCopy[accIndex].balance = accBalance;
      setAccounts(accountsCopy);

      console.log(accountsCopy[accIndex]);

      let response = await fetch(`/api/bank-accounts/${accountsCopy[accIndex].id}`, {
        method: "PUT",
        headers: Object.assign({ "Content-Type": "application/json" }, AuthService.getAuthHeader()),
        body: JSON.stringify(accountsCopy[accIndex])
      });

      if (!response.ok) {
        console.log(response.statusText);
        ErrorCodeHandling(response.status);
      }

      if (bank.id === 0) {
        let json = await response.json();
        let newBanks = [...banks, json.bank];
        setBanks(newBanks);
      }
    } else {
      let newAccount = { id: 0, number: accNumber, balance: accBalance, active: true, bank: bank };
      setAccounts([...accounts, newAccount]);

      let response = await fetch("/api/bank-accounts", {
        method: "POST",
        headers: Object.assign({ "Content-Type": "application/json" }, AuthService.getAuthHeader()),
        body: JSON.stringify(newAccount)
      });

      if (!response.ok) {
        console.log(response.statusText);
        ErrorCodeHandling(response.status);
      }

      if (bank.id === 0) {
        let json = await response.json();
        let newBanks = [...banks, json.bank];
        setBanks(newBanks);
      }
    }

    onClose();
  };

  React.useEffect(() => {
    if (open) {
      if (accIndex < 0) {
        document.getElementById("dialog-bank").value = "";
        document.getElementById("dialog-number").value = "";
        document.getElementById("dialog-balance").value = "";
      } else {
        document.getElementById("dialog-bank").value = accounts[accIndex].bank.name;
        document.getElementById("dialog-number").value = accounts[accIndex].number;
        document.getElementById("dialog-balance").value = accounts[accIndex].balance / 100;
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} keepMounted>
      <DialogTitle>{actionName} bank account</DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo
          id="dialog-bank"
          options={banks ? banks.map(bank => bank.name) : []}
          renderInput={params => <TextField {...params} label="Bank" fullWidth />}
          required
        />
        <TextField
          autoFocus
          id="dialog-number"
          label="Account number"
          inputProps={{ maxLength: 26 }}
          fullWidth
          required
        />
        <TextField
          id="dialog-balance"
          label="Balance"
          type="number"
          inputProps={{ step: 0.01, min: 0 }}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <DarkThemeButton onClick={onClose} color="primary">
          Cancel
        </DarkThemeButton>
        <DarkThemeButton onClick={onClickAccept} color="primary">
          {actionName}
        </DarkThemeButton>
      </DialogActions>
    </Dialog>
  );
}

export default function Accounts() {
  const classes = useStyles();
  const [accounts, setAccounts] = React.useState();
  const [banks, setBanks] = React.useState();
  const [selected, setSelected] = React.useState(-1);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      let response = await fetch("/api/bank-accounts", {
        method: "GET",
        headers: AuthService.getAuthHeader()
      });

      if (!response.ok) {
        console.log(response.statusText);
        ErrorCodeHandling(response.status);
      }

      setAccounts(await response.json());

      response = await fetch("/api/banks", {
        method: "GET",
        headers: AuthService.getAuthHeader()
      });

      if (!response.ok) {
        console.log(response.statusText);
        ErrorCodeHandling(response.status);
      }

      setBanks(await response.json());
    })();
  }, []);

  function selectPaper(event, i) {
    setSelected(i);
    event.stopPropagation();
  }

  return (
    <>
      <Grid container spacing={2} onClick={() => setSelected(-1)}>
        {accounts
          ? accounts.map((account, index) => (
              <Grid item key={index} className={classes.gridItem} xs={12} md={6} lg={4} xl={3}>
                <Paper
                  className={`${classes.paper} ${selected === index ? classes.paperSelected : ""}`}
                  variant={selected === index ? "outlined" : "elevation"}
                  elevation={3}
                  onClick={e => selectPaper(e, index)}
                >
                  <Typography color="textSecondary">{account.bank.name}</Typography>
                  <Typography color="textSecondary">{account.number}</Typography>
                  <Typography
                    variant="h1"
                    component="h1"
                    className={classes.balance}
                    style={{ color: account.balance < 1e4 ? "red" : account.balance < 1e5 ? "orange" : "green" }}
                  >
                    {(account.balance / 100).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            ))
          : null}
      </Grid>
      <Fab
        className={classes.fab}
        color={selected < 0 ? "primary" : "secondary"}
        onClick={event => {
          setDialogOpen(true);
          event.stopPropagation();
        }}
      >
        {selected < 0 ? <AddIcon /> : <EditIcon />}
      </Fab>
      <EditAccountDialog
        accounts={accounts}
        setAccounts={setAccounts}
        accIndex={selected}
        banks={banks}
        setBanks={setBanks}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        actionName={selected < 0 ? "Add" : "Edit"}
      />
    </>
  );
}
