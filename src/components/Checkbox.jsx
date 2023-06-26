import React from "react";

const Checkbox = ({ state, onChange, title }) => {
  return (
    <div>
      <input id={title} type="checkbox" checked={state} onChange={onChange} />
      <label htmlFor={title}>{title}</label>
    </div>
  );
};

export default Checkbox;
