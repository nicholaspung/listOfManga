import React from "react";

const Title = props => {
  return (
    <div className="titles">
      {props.title}
      <button onClick={() => props.removeFromLocalStorage(props.title)}>
        x
      </button>
    </div>
  );
};

export default Title;
