import React from "react";

const ListWithButton = props => {
  let url = props.post.data.url;
  if (url.indexOf("&") > 1) {
    url = url.replace("&amp;", "&");
  }

  return (
    <div className="titles">
      {props.post.data.title}
      <button>
        <a href={url}>Link</a>
      </button>
      <button onClick={props.handleClick} value={props.post.data.id}>
        x
      </button>
    </div>
  );
};

export default ListWithButton;
