import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import StepConnector from "@material-ui/core/StepConnector";
import Register from "./Register.js";
import Details from "./Details.js";
import SwipeableViews from "react-swipeable-views";
import { PersonAddOutlined } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { nextStep, goBack } from "../../actions/registerActions.js";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    width: "100%",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  steeper: {
    backgroundColor: "#fafafa",
    width: "100%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundImage: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)"
  }
}));

function getSteps() {
  return ["Register ", "Set up details"];
}

function RegistrationPage(props) {
  const classes = useStyles();
  const activeStep = props.step;
  const steps = getSteps();

  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlined />
        </Avatar>
        <SwipeableViews
          axis="x"
          index={activeStep}
          // onChangeIndex={handleChangeIndexChart}
        >
          <Register />
          <Details />
        </SwipeableViews>
        <Stepper className={classes.steeper} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  step: state.register.step
});

export default connect(mapStateToProps, { nextStep, goBack })(RegistrationPage);
