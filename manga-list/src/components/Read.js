import React from "react";
import List from "./List";

const Read = props => {
  return (
    <div>
      <p>Read</p>
      {props.read.map(post => (
        <List post={post} key={post.data.id} />
      ))}
    </div>
  );
};

export default Read;
