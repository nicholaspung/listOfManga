import React from 'react';

const List = props => {
  console.log(props.post.data)
  return (
    <div>
      {props.post.data.title}
    </div>
  );
}

export default List;
