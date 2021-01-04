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
  Badge,
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
  Typography
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
import Bill from "./Tables/Expense/Expense";
import firebase from 'firebase/app';
import 'firebase/messaging';
import clientJson from '../clientJson.js';
import NotificationSystem from 'react-notification-system';
import NotificationMenu from "./Notifications/NotificationMenu.js";
import {Skeleton} from '@material-ui/lab';
import AuthService from "../api/AuthService";

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

async function InitFireBase()
{
    const initializedFirebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCoy2KVfE3CotDEwJk5X5xbkA0HMa0O5L0",
        authDomain: "bgttracket.firebaseapp.com",
        projectId: "bgttracket",
        storageBucket: "bgttracket.appspot.com",
        messagingSenderId: "487395361382",
        appId: "1:487395361382:web:9b492dcbfa3b77339923a7"
    });
}


async function SubscribeToUserTopic(user)
{
    // !!!!!!!!
    // to do replace with actuac user id
    // !!!!!!!!

    const messaging = firebase.messaging();

    try{
        const currentToken = await messaging.getToken({
            vapidKey: 'BAxFZLrrh8nZ_BmuUYpkYjL3s6plsYNWZjou86Fys3w1zfZThBjmR3Kv12D5nP8B2Wv8VKS_SGY0NF9rOkSXt4M',
        });
        // console.log("Token: " + currentToken);
        clientJson({method: 'POST', path: '/api/pushsubscribe', params: {
            token: currentToken,
            topic: user
            }}).then((response) => {
                console.log("push subsciption");
                console.log(response);
            })
    }catch (e) {
        console.log('somthing went wrong', e);
        return;

    }

}

const notifications2 = [
    {
      id: 1,
      title: 'Error',
      level: 'error',
      msg: 'aleres',
      action: 'nwm',
      open: true,
    },
    {
      id: 2,
      title: 'warning',
      level: 'warning',
      msg: 'aleres',
      action: 'nwm',
      open: true,
    },
    {
      id: 3,
      title: 'success',
      level: 'success',
      msg: 'aleres',
      open: true,
    },
  ]

const userId = 2;

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const { path, url } = useRouteMatch();
  const [fireBaseInit, setFireBaseInit] = React.useState(false);
  const [userSubscribed, setUserSubscribed] = React.useState(false);
  const [notifications, setNotfications] = React.useState();
  const [lodaing, setLodaing] = React.useState(false);

  if (!fireBaseInit)
  {
      InitFireBase();
      setFireBaseInit(true);
  }
  if(!userSubscribed)
  {
      SubscribeToUserTopic(userId); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setUserSubscribed(true);
  }
  // !!!!!!!!
  // to do replace with user id
  // !!!!!!!!

  function removeNotication(notificationId)
  {
      clientJson({method: 'POST', path: "/api/notificationsread",  
      headers : AuthService.getAuthHeader(),
      params: {
          id: notificationId
      }}).then((response) => {
              console.log("notification Read");
              console.log(response);
      }).catch(e => {
        switch (error.response.status) {
          case 403:
              console.error("403");
              break
          default:
              console.error(e);
        }
      })
  }

  let notificationSystem = React.createRef();

  const addNotification = data => {
    const notification = notificationSystem.current;
    let not = {
      id: data.id,
      message: data.msg,
      level: data.level,
      title: data.title,
      action: {
      label: 'Got it!',
      callback: function() {
          removeNotication(data.id);
      }
      },
      onRemove: () => {
          reloadNotifications();
      }
    };
    notification.addNotification(not);
  };

  navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.firebaseMessaging.payload.data.action === 'showNotification')
      {
          try
          {
              addNotification(event.data.firebaseMessaging.payload.data);
          }
          catch(e)
          {
            //no idea why it works so i don't bother rn
            //of course i'm sorry for this horrible thing but liblary has forced my hand 
          }
      }
  });

  const reloadNotifications = () => {
      setNotfications(undefined);
      setLodaing(!lodaing);
      //yes it is not good
      //yes i have no enefry and time to think of better 
      //it works so it stays for no 
  }

  React.useEffect(() => {
      clientJson({method: 'GET', path: '/api/getNotifications/', params: {
        user: userId
    }}).then((response) => {
        let nots = response.entity.notifications;
        for(var n of nots)
        {
          n.open = true;
        } 
        setNotfications(nots);
    })
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
            {notifications === undefined ? <Skeleton animation="wave" variant="circle" width={40} height={40} /> : <NotificationMenu removeNotication={removeNotication} reloadnotifications={reloadNotifications} notifications={notifications}/> }
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
          </Switch>
        </Container>
      </main>
      <NotificationSystem ref={notificationSystem} />
    </div>
  );
}


// const classes = useStyles();
// const [drawerOpen, setDrawerOpen] = React.useState(true);
// const {path, url} = useRouteMatch();
// const [fireBaseInit, setFireBaseInit] = React.useState(false);
// const [userSubscribed, setUserSubscribed] = React.useState(false);
// const [notifications, setNotfications] = React.useState();
// const [lodaing, setLodaing] = React.useState(false);

// if (!fireBaseInit)
// {
//     InitFireBase();
//     setFireBaseInit(true);
// }
// if(!userSubscribed)
// {
//     SubscribeToUserTopic(userId); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     setUserSubscribed(true);
// }
// // !!!!!!!!
// // to do replace with user id
// // !!!!!!!!

// function removeNotication(notificationId)
// {
//     clientJson({method: 'POST', path: "/api/notificationsread", params: {
//         id: notificationId
//         }}).then((response) => {
//             console.log("notification Read");
//             console.log(response);
//         })
// }

// let notificationSystem = React.createRef();

// const addNotification = data => {
//   const notification = notificationSystem.current;
//   let not = {
//     id: data.id,
//     message: data.msg,
//     level: data.level,
//     title: data.title,
//     action: {
//     label: 'Got it!',
//     callback: function() {
//         removeNotication(data.id);
//     }
//     },
//     onRemove: () => {
//         reloadNotifications();
//     }
//   };
//   notification.addNotification(not);
// };

// navigator.serviceWorker.addEventListener('message', event => {
//     if (event.data.firebaseMessaging.payload.data.action === 'showNotification')
//     {
//         try
//         {
//             addNotification(event.data.firebaseMessaging.payload.data);
//         }
//         catch(e)
//         {
//            //no idea why it works so i don't bother rn
//            //of course i'm sorry for this horrible thing but liblary has forced my hand 
//         }
//     }
// });

// const reloadNotifications = () => {
//     setNotfications(undefined);
//     setLodaing(!lodaing);
//     //yes it is not good
//     //yes i have no enefry and time to think of better 
//     //it works so it stays for no 
// }

// React.useEffect(() => {
//     clientJson({method: 'GET', path: '/api/getNotifications/', params: {
//       user: userId
//   }}).then((response) => {
//       let nots = response.entity.notifications;
//       for(var n of nots)
//       {
//         n.open = true;
//       } 
//       setNotfications(nots);
//   })
//   }, [lodaing]);

// return (
//     <div className={classes.root}>
//         <ChangeTitle title='bgtTracker'/>
//         <CssBaseline/>
//         <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
//             <Toolbar className={classes.toolbar}>
//                 <IconButton
//                     edge="start"
//                     color="inherit"
//                     onClick={() => setDrawerOpen(true)}
//                     className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
//                 >
//                     <MenuIcon/>
//                 </IconButton>
//                 <Typography variant="h6" color="inherit" noWrap className={classes.title}>
//                     bgtTracker
//                 </Typography>
//                     {notifications === undefined ? <Skeleton animation="wave" variant="circle" width={40} height={40} /> : <NotificationMenu removeNotication={removeNotication} reloadnotifications={reloadNotifications} notifications={notifications}/> }
//             </Toolbar>
//         </AppBar>
//         <Drawer
//             variant="permanent"
//             classes={{paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)}}
//             open={drawerOpen}
//         >
//             <div className={classes.toolbarIcon}>
//                 <IconButton onClick={() => setDrawerOpen(false)}>
//                     <ChevronLeftIcon/>
//                 </IconButton>
//             </div>
//             <Divider/>
//             <List>{drawerItems(classes, url)}</List>
//         </Drawer>
//         <main className={classes.content}>
//             <div className={classes.appBarSpacer}/>
//             <Container maxWidth="xl" className={classes.container}>
//                 <Switch>
//                     <Route exact path={path}>
//                         <Redirect to={`${path}/dashboard`}/>
//                     </Route>
//                     <Route exact path={`${path}/dashboard`} component={Dashboard}/>
//                     <Route exact path={`${path}/stats`} component={Summary}/>
//                     <Route exact path={`${path}/history`} component={History}/>
//                     <Route exact path={`${path}/settings`} component={Settings}/>
//                     <Route exact path={`${path}/incomes`} component={Income}/>
//                     <Route exact path={`${path}/expenses`} component={Expense}/>
//                     <Route exact path={`${path}/bills`} component={Bill}/>
//                 </Switch>
//             </Container>
//         </main>
//         <NotificationSystem ref={notificationSystem} />