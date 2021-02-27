import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { DarkThemeButton } from "../Misc/ColoredButtons.js";

const theme = createMuiTheme();

const useStyles = makeStyles({
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
});

export default function ObjectiveDialog(props) {
  const classes = useStyles();
  const maxWidth = "xl";
  const open = props.open;
  const [id, setID] = React.useState(props.comment.id);
  const [title, setTitle] = React.useState(props.comment.title);
  const [contnet, setContent] = React.useState(props.comment.contnet);
  const [contentError, setContentError] = React.useState(false);
  const [titleError, settitleError] = React.useState(false);

  const handleClose = () => {
    props.handleClose();
  };

  const handleSave = () => {
    if (!contentError) {
      props.handleSave({
        id: id,
        content: contnet,
        title: title
      });
      props.handleClose();
    } else {
      // to do notifications that cannot save with error
    }
  };

  const checkContent = event => {
    if (event.target.value.length > 255) {
      setContentError(true);
    } else {
      setContentError(false);
    }
    setContent(event.target.value);
  };

  const checktitle = event => {
    if (event.target.value.length > 60) {
      settitleError(true);
    } else {
      settitleError(false);
    }
    setTitle(event.target.value);
  };

  return (
    <div>
      <div>
        <Dialog
          className={classes.dialogHeight}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Comment: </DialogTitle>
          <DialogContent>
            <Grid container direction="column" justify="space-around">
              <Grid item xs={6}>
                <TextField
                  className={classes.nameTextFile}
                  id="Title"
                  label="Title"
                  variant="outlined"
                  helperText={"max 60 chars"}
                  value={title}
                  error={titleError}
                  onChange={checktitle}
                />
              </Grid>
              <div className={classes.BlankSpace} />
              <Grid item xs={12}>
                <TextField
                  className={classes.bigTextField}
                  id="outlined-multiline-static"
                  label="Descriptions"
                  multiline
                  helperText="Max 255 characters"
                  rows={4}
                  variant="outlined"
                  value={contnet}
                  onChange={checkContent}
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
    </div>
  );
}
