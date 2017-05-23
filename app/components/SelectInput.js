import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default (props) => (
  <div>
    <Select
      {...props}
      matchPos={'start'}
      deleteRemoves={false}
      backspaceRemoves={false}
      value={props.input.value}
      onChange={(value) => props.input.onChange(value.value)}
      onBlur={() => props.input.onBlur(props.input.value)}
      options={props.options}
    />
    {props.meta.touched && props.meta.error &&
      <small className="text-danger">{props.meta.error}</small>
    }
  </div>
);