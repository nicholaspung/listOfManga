import React from "react";
import List from "./List";

const RedditList = props => {
  return (
    <div className="reddit-list">
      <h3>Not filtered</h3>
      {props.redditData.map(post => (
        <List post={post} key={post.data.id} />
      ))}
    </div>
  );
};

export default RedditList;
