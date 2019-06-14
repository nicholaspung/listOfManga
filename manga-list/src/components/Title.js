import React from "react";

const Title = props => {
  return (
    <div>
      {props.title}
      <button onClick={props.removeFromLocalStorage}>x</button>
    </div>
  );
};

export default Title;
