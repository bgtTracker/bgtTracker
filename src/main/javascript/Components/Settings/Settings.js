import React,{useState, useEffect} from 'react'
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';;
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
}}
));

export default function Settings() {
    const [password, setPassword] = useState();
    const [name, setName] = useState('Billy');
    const [lastName, setLastName] = useState('Herrington');

    const maxWidth = 'xl';
    const [open, setOpen] = useState(false);
    const [passDialogOpen, setPassDialogOpen] = useState(false);
    function HandleNamesChange(){
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
    }

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} alignItems='center' justify='center'>
                    <Paper>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                        <Grid container spacing={4} direction='Row' alignItems='center' justify='center'>   
                            <Grid item xs={4}>
                                <p>First name: {name}     Last name: {lastName}</p>
                            </Grid>
                            <Grid item>
                                <Button onClick={HandleNamesChange}>Change</Button>
                                <Dialog
                                    maxWidth={maxWidth}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="max-width-dialog-title"
                                >
                                    <DialogTitle id="max-width-dialog-title">Select Period</DialogTitle>
                                    <DialogContent>
                                    <Grid container justify="space-around">
                                        <TextField id="First Name" label="First Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
                                        <TextField id="Last Name" label="Last Name" variant="outlined"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                                    </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Done
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Divider flexItem variant="middle"/>

                        <Grid item xs={12}>
                        <Grid container spacing={4} direction='Row' alignItems='center' justify='center'>   
                            <Grid item>
                                <Button onClick={()=>setPassDialogOpen(true)}>Change password</Button>
                                <Dialog
                                    maxWidth={maxWidth}
                                    open={passDialogOpen}
                                    onClose={()=>setPassDialogOpen(false)}
                                    aria-labelledby="max-width-dialog-title"
                                >
                                    <DialogTitle id="max-width-dialog-title">Select Period</DialogTitle>
                                    <DialogContent>
                                    <Grid container justify="space-around">
                                        <TextField id="Password" label="Password" variant="outlined"  onChange={(e)=>setPassword(e.target.value)}/>
                                    </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={()=>setPassDialogOpen(false)} color="primary">
                                        Done
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            </Grid>
                        </Grid>

                        <Divider flexItem variant="middle"/>
                    </Grid>    
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
