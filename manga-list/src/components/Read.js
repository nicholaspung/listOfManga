import React from "react";
import List from "./List";

const Read = props => {
  return (
    <div>
      <h3>History of Titles Marked Read</h3>
      {props.read.map(post => (
        <List post={post} key={post.data.id} />
      ))}
    </div>
  );
};

export default Read;
