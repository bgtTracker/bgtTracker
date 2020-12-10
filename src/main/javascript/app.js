import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
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

import Dashboard from "./Components/Dashboard";
import Summary from "./Components/Summary/Summary";
import History from "./Components/History/History";
import Income from "./Components/Tables/Income/Income"
import Expense from "./Components/Tables/Expense/Expense"
import Bill from "./Components/Tables/Bill/Bill"

const drawerWidth = 240;

const styles = theme => ({
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
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true
        }
    }

    render() {
        const classes = this.props.classes;
        const open = this.state.drawerOpen;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => this.setState({drawerOpen: true})}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
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
                    classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={() => this.setState({drawerOpen: false})}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{this.drawerItems()}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="xl" className={classes.container}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/dashboard"/>
                            </Route>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route exact path="/summary" component={Summary}/>
                            <Route exact path="/history" component={History}/>
                            <Route exact path="/incomes" component={Income} />
                            <Route exact path="/expenses" component={Expense} />
                            <Route exact path="/bills" component={Bill} />
                        </Switch>
                    </Container>
                </main>
            </div>
        );
    }

    drawerItems() {
        const classes = this.props.classes;
        const sections = [
            ['Dashboard', '/dashboard', <DashboardOutlinedIcon/>],
            ['Statistics', '/stats', <BarChartIcon/>],
            ['Expenses', '/expenses', <AttachMoneyIcon/>],
            ['Incomes', '/incomes', <WorkOutlineIcon/>],
            ['Bills', '/bills', <ReceiptOutlinedIcon/>],
            ['Objectives', '/objectives', <GpsFixedIcon/>],
            ['Comments', '/comments', <CommentOutlinedIcon/>],
            ['Accounts', '/accounts', <AccountBalanceWalletOutlinedIcon/>],
            ['Settings', '/settings', <SettingsOutlinedIcon/>]
        ];

        return (
            <>
                {sections.map(([name, dest, icon], index) => (
                    <NavLink key={index} to={dest} className={classes.linkInactive} activeClassName={classes.linkActive}>
                        <ListItem button>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={name}/>
                        </ListItem>
                    </NavLink>
                ))}
            </>
        );
    }
}

const StyledApp = withStyles(styles)(App);

ReactDOM.render(
    <Router>
        <StyledApp/>
    </Router>,
    document.getElementById('react')
);