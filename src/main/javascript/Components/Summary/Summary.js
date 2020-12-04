import React, {useState} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SummaryGetter from './SummaryGetter.js';



var firstRender = 0;

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export default function Summary() {
    const classes = useStyles();
    const periods = ['thisMonth', 'thisYear', 'lastYear', 'customPeriod'];
    const [period, setPeriod] = useState({
        thisMonth: true,
        thisYear: false,
        lastYear: false,
        customPeriod: false,
    });

    const defaultPeriod = {
        thisMonth: false,
        thisYear: false,
        lastYear: false,
        customPeriod: false,
    }

    const [drawerOpened, setDrawerOpened] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerOpened(open);
      };

    const handlePeriodChange = (p) => (event) => {
        setPeriod({ ...defaultPeriod, [p]: true})
    }

    const handleCustomPeriodChange = (p) => (event) => {
        setPeriod({ ...defaultPeriod, [p]: true})
    }

    const list = () => (
    <div
        className={clsx(classes.list, classes.fullList)}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
        <List>
        {['This Month', 'This Year', 'Last Year'].map((text, index) => (
            <ListItem button key={text} onClick={handlePeriodChange(periods[index])}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List>
        <Divider />
        <List>
        {['Custom Period'].map((text, index) => (
            <ListItem button key={text} onClick={handleCustomPeriodChange(periods[3])}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List>
    </div>
    );

    return (
        <div>
            <div >
                <React.Fragment key={"bottom"}>
                    <Button onClick={toggleDrawer(true)}>Select Period</Button>
                    <Drawer anchor={"bottom"} open={drawerOpened} onClose={toggleDrawer(false)}>
                        {list()}
                    </Drawer>
                </React.Fragment>
            </div>
            {period.thisMonth  === true ? <SummaryGetter period={'thisMonth'}/> : <div/>}
            {period.thisYear  === true ? <h1>this year</h1> : <div/>}
            {period.lastYear  === true ? <h1>last year</h1> : <div/>}
            {period.customPeriod  === true ? <h1>custom period</h1> : <div/>}
        </div>
    )
}

