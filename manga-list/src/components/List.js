import React from 'react';

const List = props => {
  return (
    <div>
      {props.post.data.title}
      <button><a href={props.post.data.url}>Link</a></button>
    </div>
  );
}

export default List;
