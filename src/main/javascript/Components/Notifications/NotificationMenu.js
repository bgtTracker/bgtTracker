import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import  NotificationsOutlined from '@material-ui/icons/NotificationsOutlined';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import { element } from 'prop-types';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function NotificationMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [dissmed, setDissmed] = React.useState([]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const checkOpen = (element) => {
      if(dissmed.includes(element.id))
      {
        return false;
      }
      return element.open;
    }

    const handleDissmisal = (element) => {
      element.open = false;
      setDissmed(dissmed =>[ ...dissmed, element.id]);
    }

    return (
      <div>
        <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
          <NotificationsOutlined/>
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {props.notifications.map((element) => (
          <Collapse in={checkOpen(element)}>
              <MenuItem>
              <Alert severity={element.level} action={
                    <Button color="inherit" size="small" onClick = {() => handleDissmisal(element)}>
                      Got it!
                    </Button>}>
                      <AlertTitle>{element.title}</AlertTitle>
                       {element.msg}
              </Alert>
            </MenuItem>
            </Collapse>
          ))}
          {/* <MenuItem>
            <Alert severity="error" action={
                  <Button color="inherit" size="small">
                    Got It !
                  </Button>}>
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — check it out!
            </Alert>
          </MenuItem>
          <MenuItem>
            <Alert severity="warning">This is a warning alert — check it out!</Alert>
          </MenuItem> */}
        </Menu>
      </div>
    );
  }