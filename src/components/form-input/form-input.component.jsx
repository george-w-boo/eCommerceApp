import React from 'react';

import {
  Group,
  FormInputContainer,
  FormInputLabel,
} from './form-input.styles';

const FormInput = ({handleChange, label, ...otherProps}) => {
  return (
    <Group>
      <FormInputContainer onChange={handleChange} {...otherProps} />
      {label ? (
        <FormInputLabel {...otherProps}>
          {label}
        </FormInputLabel>
      ) : null}
    </Group>
  )
}

export default FormInput;
