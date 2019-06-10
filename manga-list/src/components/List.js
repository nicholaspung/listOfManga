import React from 'react';

const List = props => {
  let url = props.post.data.url;
  if (url.indexOf("&") > 1) {
    url = url.replace("&amp;", "&");
  }

  return (
    <div>
      {props.post.data.title}
      <button><a href={url}>Link</a></button>
    </div>
  );
}

export default List;
