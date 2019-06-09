import React from 'react';
import List from './List';

const FilteredList = props => {
  return (
    <div>
      {props.filteredData.map(post => <List post={post} key={post.data.id} />)}
    </div>
  );
}

export default FilteredList;
