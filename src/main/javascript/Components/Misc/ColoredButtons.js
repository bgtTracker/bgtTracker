import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import React from "react";

export const PurpleGradientButton = withStyles(theme => ({
  root: {
    backgroundImage: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)"
  }
}))(Button);

export const PinkGradientButton = withStyles(theme => ({
  root: {
    backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
  }
}))(Button);

export const DarkThemeButton = props => {
  const theme = useTheme();

  let clone = Object.assign({}, props);
  let color = "primary";
  if (theme.palette.type == "dark") {
    color = "secondary";
  }

  clone.color = color;
  return <Button {...clone}>{props.children}</Button>;
};
