import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import NotificationsOutlined from "@material-ui/icons/NotificationsOutlined";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import Badge from "@material-ui/core/Badge";
import { element } from "prop-types";

const theme = createMuiTheme();

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function NotificationMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [dissmed, setDissmed] = React.useState([]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    props.reloadnotifications();
    setAnchorEl(null);
  };

  const checkOpen = element => {
    if (dissmed.includes(element.id)) {
      return false;
    }
    return element.open;
  };

  const handleDissmisal = element => {
    props.removeNotication(element.id);
    element.open = false;
    setDissmed(dissmed => [...dissmed, element.id]);
  };

  return (
    <div>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={props.notifications.length} color="secondary">
          <NotificationsOutlined />
        </Badge>
      </IconButton>
      {props.notifications.length === 0 ? (
        <div>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem>
              <h3>Nothings new</h3>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {props.notifications.map(element => (
              <Collapse key={element.id} in={checkOpen(element)}>
                <MenuItem>
                  <Alert
                    severity={element.level}
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={() => handleDissmisal(element)}
                      >
                        Got it!
                      </Button>
                    }
                  >
                    <AlertTitle>{element.title}</AlertTitle>
                    {element.msg}
                  </Alert>
                </MenuItem>
              </Collapse>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}
