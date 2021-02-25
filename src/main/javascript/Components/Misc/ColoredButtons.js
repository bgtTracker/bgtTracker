import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const PurpleGradientButton = withStyles(theme => ({
  root: {
    backgroundImage: "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)"
  }
}))(Button);
