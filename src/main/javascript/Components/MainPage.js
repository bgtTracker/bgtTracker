import React from 'react';
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
} from '@material-ui/core';
import {
    AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
    NotificationsOutlined as NotificationsOutlinedIcon,
    AttachMoney as AttachMoneyIcon,
    BarChart as BarChartIcon,
    CommentOutlined as CommentOutlinedIcon,
    ChevronLeft as ChevronLeftIcon,
    DashboardOutlined as DashboardOutlinedIcon,
    GpsFixed as GpsFixedIcon,
    Menu as MenuIcon,
    ReceiptOutlined as ReceiptOutlinedIcon,
    SettingsOutlined as SettingsOutlinedIcon,
    WorkOutline as WorkOutlineIcon
} from '@material-ui/icons';

import ChangeTitle from "./ChangeTitle";
import Dashboard from "./Dashboard";
import Summary from "./Summary/Summary";
import History from "./History/History";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    linkInactive: {
        color: 'inherit',
        backgroundColor: 'inherit',
        textDecoration: 'none'
    },
    linkActive: {
        color: theme.palette.primary.main,
        textDecoration: 'none'
    }
}));

function drawerItems(classes, url) {
    const sections = [
        ['Dashboard', 'dashboard', <DashboardOutlinedIcon/>],
        ['Statistics', 'stats', <BarChartIcon/>],
        ['Expenses', 'expenses', <AttachMoneyIcon/>],
        ['Incomes', 'incomes', <WorkOutlineIcon/>],
        ['Bills', 'bills', <ReceiptOutlinedIcon/>],
        ['Objectives', 'objectives', <GpsFixedIcon/>],
        ['Comments', 'comments', <CommentOutlinedIcon/>],
        ['Accounts', 'accounts', <AccountBalanceWalletOutlinedIcon/>],
        ['Settings', 'settings', <SettingsOutlinedIcon/>]
    ];

    return (
        <>
            {sections.map(([name, dest, icon], index) => (
                <ListItem button key={index} component={NavLink} to={`${url}/${dest}`} className={classes.linkInactive} activeClassName={classes.linkActive}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItem>
            ))}
        </>
    );
}

export default function MainPage() {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const {path, url} = useRouteMatch();

    return (
        <div className={classes.root}>
            <ChangeTitle title='bgtTracker'/>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setDrawerOpen(true)}
                        className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        bgtTracker
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} invisible={true}>
                            <NotificationsOutlinedIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)}}
                open={drawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{drawerItems(classes, url)}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="xl" className={classes.container}>
                    <Switch>
                        <Route exact path={path}>
                            <Redirect to={`${path}/dashboard`}/>
                        </Route>
                        <Route exact path={`${path}/dashboard`} component={Dashboard}/>
                        <Route exact path={`${path}/summary`} component={Summary}/>
                        <Route exact path={`${path}/history`} component={History}/>
                    </Switch>
                </Container>
            </main>
        </div>
    );
}