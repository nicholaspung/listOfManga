import React from "react";
import ListWithButton from "./ListWithButton";

const Unread = props => {
  return (
    <div>
      <p>Unread</p>
      {props.unread.map(post => (
        <ListWithButton
          post={post}
          key={post.data.id}
          handleClick={props.handleClick}
        />
      ))}
    </div>
  );
};

export default Unread;
