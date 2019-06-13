import React from "react";
import Form from "./Form";
import Title from "./Title";

const MySavedTitles = props => {
  console.log(props.mangaList);
  props.mangaList.forEach(item => console.log(item));
  // TypeError: props.mangaList.forEach is not a function
  return (
    <div>
      <p>My Saved Titles</p>
      <Form updateLocalFilterData={props.updateLocalFilterData} />
    </div>
  );
};

export default MySavedTitles;
