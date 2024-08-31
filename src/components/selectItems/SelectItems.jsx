import "./selectItems.scss";
import { useState } from "react";
import Select from "react-select";
//import makeAnimated from 'react-select/animated';
const SelectItems = (props) => {
  const { onChange, options, text, id } = props;
  //const animatedComponent=makeAnimated;

  return (
    <div className="select-group">
      <label className="select__label" htmlFor={id}>
        {text}
      </label>
      <Select
        // isMulti
        className="select"
        // components={ animatedComponent}
        options={options}
        closeMenuOnSelect={false}
        //defaultValue={initial}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectItems;
