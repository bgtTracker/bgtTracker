import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CommentDialog from "./CommentDialog.js";
import AuthService from "../../api/AuthService.js";
import { DarkThemeButton } from "../Misc/ColoredButtons.js";

// const useStyles = makeStyles({

// });

export default function CommentCard(props) {
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log(props.comment.id);
    fetch("/api/comments/delete", {
      method: "Delete",
      headers: AuthService.getAuthHeader(),
      body: JSON.stringify(props.comment.id)
    })
      .then(response => {
        console.log(response);
        props.reloadComments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSave = toSave => {
    fetch("/api/comments/edit", {
      method: "put",
      headers: AuthService.getAuthHeader(),
      body: JSON.stringify(toSave)
    })
      .then(response => {
        console.log(response);
        props.reloadComments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Card>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.comment.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.comment.contnet}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <DarkThemeButton fullWidth color="primary" onClick={handleDelete} size="small">
            Delete
          </DarkThemeButton>
          <DarkThemeButton fullWidth color="primary" onClick={handleOpen} size="small">
            Edit
          </DarkThemeButton>
        </CardActions>
      </Card>
      <CommentDialog open={open} handleSave={handleSave} handleClose={handleClose} comment={props.comment} />
    </div>
  );
}
