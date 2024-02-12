import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

const CheckboxComponent: React.FC<CheckboxProps> = React.forwardRef((props, ref) => {
  return <Checkbox {...props} ref={ref} />;
});

CheckboxComponent.displayName = 'CheckboxComponent';

export default CheckboxComponent;