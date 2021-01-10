import React from "react";
import { TextField } from "@material-ui/core";

export default function RegexTextField({ regex, invalidText, ...props }) {
  const [isError, setError] = React.useState(props.error);
  const [helperText, setHelperText] = React.useState(props.helperText);

  React.useEffect(() => {
    setError(props.error);
    setHelperText(props.helperText);
  }, [props.error, props.helperText]);

  const onChange = event => {
    if (!event.target.value.match(regex)) {
      setError(true);
      setHelperText(invalidText);
    } else {
      setError(false);
      setHelperText(undefined);
    }
  };

  return <TextField {...props} error={isError} helperText={helperText} onChange={onChange.bind(this)} />;
}
