import React from 'react';
import './App.css';
import List from './components/List';

import mangaTitles from './titles';

class App extends React.Component {
  state = {
    redditData: [],
    filter: mangaTitles,
    filteredData: []
  }

  fetchMangaData = () => {
    fetch('https://www.reddit.com/r/manga.json')
      .then(res => res.json())
      .then(dataObject => this.setState({
        redditData: dataObject.data.children
      }));
  };

  filterMangaTitle = () => {
    // this.state.redditData contains array of objects of reddit posts
    // i want to use filter on this.state.redditData
    // it should pass true if post.includes(any title in array from this.state.filter)
    // i need to iterate on this.state.filter
    // if any pass, return true
    // if all fail, return false

    // assume string="hello there" and i need to filter with array=["hello", "world"]
    // let result;
    // for (let i=0; i<array.length; i++) {
    //    result = string.includes(array[i])
    //    if (result) {
    //      break;
    //    }
    // }
    // return true
  }

  generateList = () => {
    this.fetchMangaData()
    this.filterMangaTitle()
  }

  render() {
    console.log(this.state.filteredData)
    return (
      <div className="App">
        <p>Generate Manga List by clicking on button.</p>
        <button onClick={this.generateList}>BUTTON</button>
        <p>Filtered</p>
        {this.state.filteredData.map(post => <List post={post} key={post.data.id} />)}
        <p>Not filtered</p>
        {this.state.redditData.map(post => <List post={post} key={post.data.id} />)}
      </div>
    );
  }
}

export default App;
