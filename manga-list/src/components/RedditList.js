import React from 'react';
import List from './List';

const RedditList = props => {
  return (
    <div>
      <p>Not filtered</p>
      {props.redditData.map(post => <List post={post} key={post.data.id} />)}
    </div>
  );
}

export default RedditList;
