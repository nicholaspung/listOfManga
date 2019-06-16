import React from "react";
import List from "./List";

const FilteredList = props => {
  return (
    <div className="filtered-list">
      <h3>Filtered</h3>
      {props.filteredData.map(post => (
        <List post={post} key={post.data.id} />
      ))}
    </div>
  );
};

export default FilteredList;
