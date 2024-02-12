import React from 'react';
import Select, { SelectProps, SelectChangeEvent } from '@mui/material/Select';

const SelectComponent: React.FC<SelectProps> = React.forwardRef((props, ref) => {
  return <Select {...props} ref={ref} />;
});

SelectComponent.displayName = 'SelectComponent';

export default SelectComponent;
export type { SelectChangeEvent };