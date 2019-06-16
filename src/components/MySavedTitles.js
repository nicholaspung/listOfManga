import React from "react";
import Form from "./Form";
import Title from "./Title";

const MySavedTitles = props => {
  let arr = Array.from(props.mangaList);
  return (
    <div className="my-saved-titles">
      <h3>My Saved Titles</h3>
      <Form updateLocalFilterData={props.updateLocalFilterData} />
      {arr.map(item => (
        <Title
          title={item}
          key={item}
          removeFromLocalStorage={props.removeFromLocalStorage}
        />
      ))}
    </div>
  );
};

export default MySavedTitles;
