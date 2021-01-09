import React from "react";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  AppBar,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  AttachMoney as AttachMoneyIcon,
  BarChart as BarChartIcon,
  CommentOutlined as CommentOutlinedIcon,
  ChevronLeft as ChevronLeftIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  ExitToApp as ExitToAppIcon,
  GpsFixed as GpsFixedIcon,
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  WorkOutline as WorkOutlineIcon
} from "@material-ui/icons";

import ChangeTitle from "./ChangeTitle";
import Dashboard from "./Dashboard";
import Summary from "./Summary/Summary";
import History from "./History/History";
import Settings from "./Settings/Settings.js";
import Income from "./Tables/Income/Income";
import Expense from "./Tables/Expense/Expense";
import Bill from "./Tables/Bill/Bill";
import firebase from "firebase/app";
import "firebase/messaging";
import clientJson from "../clientJson.js";
import NotificationSystem from "react-notification-system";
import NotificationMenu from "./Notifications/NotificationMenu.js";
import { Skeleton } from "@material-ui/lab";
import AuthService from "../api/AuthService";
import Objectives from "./Objectives/Objectives.js";
import ErrorRedirect from "./ErrorRedirect404.js";
import ErrorCodeHandling from "./ErrorCodeHandler.js";
import { useSnackbar } from "notistack";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  linkInactive: {
    color: "inherit",
    backgroundColor: "inherit",
    textDecoration: "none"
  },
  linkActive: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  }
}));

function drawerItems(classes, url) {
  const sections = [
    ["Dashboard", "dashboard", <DashboardOutlinedIcon />],
    ["Statistics", "stats", <BarChartIcon />],
    ["Expenses", "expenses", <AttachMoneyIcon />],
    ["Incomes", "incomes", <WorkOutlineIcon />],
    ["Bills", "bills", <ReceiptOutlinedIcon />],
    ["Objectives", "objectives", <GpsFixedIcon />],
    ["Comments", "comments", <CommentOutlinedIcon />],
    ["Accounts", "accounts", <AccountBalanceWalletOutlinedIcon />],
    ["Settings", "settings", <SettingsOutlinedIcon />]
  ];

  return (
    <>
      {sections.map(([name, dest, icon], index) => (
        <ListItem
          button
          key={index}
          component={NavLink}
          to={`${url}/${dest}`}
          className={classes.linkInactive}
          activeClassName={classes.linkActive}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </>
  );
}

async function InitFireBase() {
  const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCoy2KVfE3CotDEwJk5X5xbkA0HMa0O5L0",
    authDomain: "bgttracket.firebaseapp.com",
    projectId: "bgttracket",
    storageBucket: "bgttracket.appspot.com",
    messagingSenderId: "487395361382",
    appId: "1:487395361382:web:9b492dcbfa3b77339923a7"
  });
}

async function SubscribeToUserTopic(user) {
  const messaging = firebase.messaging();

  if (
    localStorage.getItem("pushRegistered") === "true" &&
    localStorage.getItem("pushNotificationsTopic") !== null &&
    localStorage.getItem("pushToken") !== null
  ) {
    try {
      clientJson({
        method: "POST",
        path: "/api/unsubscribe",
        headers: AuthService.getAuthHeader(),
        params: {
          token: localStorage.getItem("pushToken"),
          topic: localStorage.getItem("pushNotificationsTopic")
        }
      }).then(response => {
        console.log("push unsubsciption");
        console.log(response);
      });
    } catch (e) {
      console.log("somthing went wrong", e);
    }
  }

  try {
    const currentToken = await messaging.getToken({
      vapidKey:
        "BAxFZLrrh8nZ_BmuUYpkYjL3s6plsYNWZjou86Fys3w1zfZThBjmR3Kv12D5nP8B2Wv8VKS_SGY0NF9rOkSXt4M"
    });
    // console.log("Token: " + currentToken);
    clientJson({
      method: "POST",
      path: "/api/pushsubscribe",
      headers: AuthService.getAuthHeader(),
      params: {
        token: currentToken
      }
    }).then(response => {
      console.log("push subsciption");
      console.log(response);
      localStorage.setItem("pushRegistered", true);
      localStorage.setItem("pushNotificationsTopic", response.entity);
      localStorage.setItem("pushToken", currentToken);
    });
  } catch (e) {
    console.log("somthing went wrong", e);
  }
}

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const { path, url } = useRouteMatch();
  const [fireBaseInit, setFireBaseInit] = React.useState(false);
  const [userSubscribed, setUserSubscribed] = React.useState(false);
  const [listenerAdded, setListinerAdded] = React.useState(false);
  const [notifications, setNotfications] = React.useState();
  const [lodaing, setLodaing] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (firebase.apps.length === 0) {
    InitFireBase();
  }

  if (!userSubscribed) {
    SubscribeToUserTopic();
    setUserSubscribed(true);
  }

  function removeNotication(notificationId) {
    clientJson({
      method: "POST",
      path: "/api/notificationsread",
      headers: AuthService.getAuthHeader(),
      params: {
        id: notificationId
      }
    })
      .then(response => {})
      .catch(e => {
        ErrorCodeHandling(e.status.code);
      });
  }

  //let notificationSystem = React.createRef();

  // const addNotification = data => {
  //   const notification = notificationSystem.current;
  //   let not = {
  //     id: data.id,
  //     message: data.msg,
  //     level: data.level,
  //     title: data.title,
  //     action: {
  //       label: "Got it!",
  //       callback: function () {
  //         removeNotication(data.id);
  //       }
  //     },
  //     onRemove: () => {
  //       reloadNotifications();
  //     }
  //   };
  //   notification.addNotification(not);
  // };

  // const action = key => {
  //   <Fragment>
  //     <Button onClick>
  //         'Got it'
  //     </Button>
  //     <Button onClick={() => { closeSnackbar(key); reloadNotifications(); }}>
  //         'Dismiss'
  //     </Button>
  //   </Fragment>
  // };

  const addNotification = data => {
    if (AuthService.getStorageBackend().getItem("logged-in") === "true") {
      enqueueSnackbar(data.msg, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        onExited: reloadNotifications,
        variant: data.level,
        // content: (
        //   <Alert
        //     severity={data.level}
        //     variant="filled"
        //     action={
        //       <React.Fragment>
        //       <Button size="small" color="inherit" onClick={() => {removeNotication(data.id); closeSnackbar(key);}}>
        //           Got it
        //       </Button>
        //       <Button size="small" color="inherit" onClick={() => { closeSnackbar(key); reloadNotifications(); }}>
        //           Dismis
        //       </Button>
        //     </React.Fragment>
        //     }
        //   >
        //     <AlertTitle>{data.title}</AlertTitle>
        //     {data.msg}
        //   </Alert>
        // ),
        action: key => (
          <React.Fragment>
            <Button
              size="small"
              color="inherit"
              onClick={() => {
                removeNotication(data.id);
                closeSnackbar(key);
              }}
            >
              Got it
            </Button>
            <Button
              size="small"
              color="inherit"
              onClick={() => {
                closeSnackbar(key);
                reloadNotifications();
              }}
            >
              Dismiss
            </Button>
          </React.Fragment>
        )
      });
    }
  };

  if (!listenerAdded) {
    navigator.serviceWorker.addEventListener("message", event => {
      if (
        event.data.firebaseMessaging.payload.data.action === "showNotification"
      ) {
        try {
          addNotification(event.data.firebaseMessaging.payload.data);
        } catch (e) {
          //no idea why it works so i don't bother rn
          //of course i'm sorry for this horrible thing but liblary has forced my hand
        }
      }
    });
    setListinerAdded(true);
  }

  async function reloadNotifications() {
    setNotfications(undefined);
    await loadNotifications();
  }

  async function loadNotifications() {
    clientJson({
      method: "GET",
      path: "/api/getNotifications/",
      headers: AuthService.getAuthHeader()
    })
      .then(response => {
        console.log(response);
        let nots = response.entity.notifications;
        for (var n of nots) {
          n.open = true;
        }
        console.log("setting nots");
        setNotfications(nots);
      })
      .catch(e => {
        ErrorCodeHandling(e.status.code);
      });
  }

  React.useEffect(() => {
    loadNotifications();
  }, [lodaing]);

  const handleLogout = event => {
    AuthService.logout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <ChangeTitle title="bgtTracker" />
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            className={clsx(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            bgtTracker
          </Typography>
          {notifications === undefined ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <NotificationMenu
              removeNotication={removeNotication}
              reloadnotifications={reloadNotifications}
              notifications={notifications}
            />
          )}
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          )
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{drawerItems(classes, url)}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/dashboard`} />
            </Route>
            <Route exact path={`${path}/dashboard`} component={Dashboard} />
            <Route exact path={`${path}/stats`} component={Summary} />
            <Route exact path={`${path}/history`} component={History} />
            <Route exact path={`${path}/settings`} component={Settings} />
            <Route exact path={`${path}/incomes`} component={Income} />
            <Route exact path={`${path}/expenses`} component={Expense} />
            <Route exact path={`${path}/bills`} component={Bill} />
            <Route exact path={`${path}/objectives`} component={Objectives} />
            <Route path="*" component={ErrorRedirect} />
          </Switch>
        </Container>
      </main>
      {/* <NotificationSystem ref={notificationSystem} /> */}
    </div>
  );
}
