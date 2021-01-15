import React from "react";
import Grid from "@material-ui/core/Grid";
import CommentCard from "./CommentCard.js";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { makeStyles } from "@material-ui/core/styles";
import CommentDialog from "./CommentDialog.js";
import AuthService from "../../api/AuthService.js";
import { Skeleton } from "@material-ui/lab";

const defaultComment = {
  title: "Comment",
  contnet: "Comment connent"
};

const test = [
  {
    id: 1,
    title: "kocham ludzi",
    contnet: "naprede nienoeenfksdnfkjsdjfksdjfsdjbsjfbjsbjfws",
    dateStamp: new Date().getTime
  },
  {
    id: 2,
    title: "kocham ludzi2",
    contnet: "naprede nienoeenfksdnfkjsdjfksdjfsdjbsjfbjsbjfws",
    dateStamp: new Date().getTime
  },
  {
    id: 3,
    title: "kocham ludzi3",
    contnet: "naprede nienoeenfksdnfkjsdjfksdjfsdjbsjfbjsbjfws",
    dateStamp: new Date().getTime
  },
  {
    id: 4,
    title: "kocham ludzi4",
    contnet: "naprede nienoeenfksdnfkjsdjfksdjfsdjbsjfbjsbjfws",
    dateStamp: new Date().getTime
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380
  },
  radioGroup: {
    margin: theme.spacing(1, 0)
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));

// const actions = [
//   { icon: <FavoriteIcon />, name: 'Add new' },
// ];

export default function Comments() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [comments, setComments] = React.useState();

  const loadNotification = () => {
    fetch("/api/comments/getAll", {
      method: "GET",
      headers: AuthService.getAuthHeader()
    })
      .then(response => response.json())
      .then(data => {
        console.log("exp");
        setComments(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const reloadComments = () => {
    setComments(undefined);
    loadNotification();
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = toSave => {
    toSave["date"] = Date.now();
    fetch("/api/comments/new", {
      method: "POST",
      headers: AuthService.getAuthHeader(),
      body: JSON.stringify(toSave)
    })
      .then(response => {
        console.log(response);
        reloadComments();
      })
      .catch(error => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    loadNotification();
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        {comments === undefined
          ? [1, 2, 3, 4].map(item => <Skeleton key={item} variant="rect" height={200} width={400} animation="wave" />)
          : comments.map(item => (
              <Grid item xs={6} key={item.id}>
                <CommentCard comment={item} reloadComments={reloadComments} />
              </Grid>
            ))}
      </Grid>
      <div>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClick={handleOpen}
          // onClose={handleClose}
          // onOpen={handleOpen}
          direction="up"
          open={false}
        >
          {/* {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))} */}
        </SpeedDial>
      </div>
      <CommentDialog open={openDialog} comment={defaultComment} handleClose={handleClose} handleSave={handleSave} />
    </div>
  );
}
