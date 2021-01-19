import React from "react";

const SelectInput = ({ handleChange, ...otherProps }, props) => {
  return (
    <div>
      <select {...otherProps} onChange={handleChange}>
        <option {...otherProps}>Select</option>
        {props.optItem.map((s) => (
          <option key={s.id} name={s.name} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
