import React from "react";
import Form from "./Form";
import Title from "./Title";

const MySavedTitles = props => {
  let arr = Array.from(props.mangaList);
  return (
    <div>
      <p>My Saved Titles</p>
      <Form updateLocalFilterData={props.updateLocalFilterData} />
      {arr.map(item => (
        <Title title={item} />
      ))}
    </div>
  );
};

export default MySavedTitles;
