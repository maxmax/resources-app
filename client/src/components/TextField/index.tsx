import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const TextFieldComponent = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField {...props} inputRef={ref} />
));

TextFieldComponent.displayName = 'TextFieldComponent';

export default TextFieldComponent;