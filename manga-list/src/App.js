import React from "react";
import "./App.css";
import FilteredList from "./components/FilteredList";
import RedditList from "./components/RedditList";
import DisplayUptime from "./components/DisplayUptime";
import Unread from "./components/Unread";
import Read from "./components/Read";

import mangaTitles from "./titles";

class App extends React.Component {
  state = {
    redditData: [],
    filter: mangaTitles,
    filteredData: [],
    unread: [],
    read: []
  };

  componentDidMount() {
    this.grabRedditData(this.filterMangaTitle);
    setInterval(() => this.grabRedditData(this.filterMangaTitle), 60000);
  }

  filterMangaTitle = () => {
    let filteringReddit = this.state.redditData.filter(post => {
      let result = "";
      for (let i = 0; i < this.state.filter.length; i++) {
        if (post.data.title.includes(this.state.filter[i])) {
          result = true;
        }
      }
      return result;
    });
    let filteringFilteredReddit = this.checkIfAlreadyInRead(
      filteringReddit,
      this.state.read
    );

    this.setState(prevState => ({ filteredData: filteringReddit }));
    this.setState(prevState => ({ unread: filteringFilteredReddit }));
  };

  grabRedditData = (callback = () => console.log("Refreshing")) => {
    fetch("https://www.reddit.com/r/manga.json")
      .then(res => res.json())
      .then(dataObject =>
        this.setState({
          redditData: dataObject.data.children
        })
      )
      .then(_ => callback());
    console.log("fetching new reddit list");
  };

  markRead = e => {
    let unclicked = this.state.unread.filter(
      item => item.data.id !== e.target.value
    );
    let clicked = this.state.unread.filter(
      item => item.data.id === e.target.value
    );
    this.setState(prevState => ({ unread: unclicked }));
    this.setState(prevState => ({ read: [...prevState.read, clicked[0]] }));
  };

  checkIfAlreadyInRead = (filteredData, read) => {
    let result = [];
    let combinedArrays = filteredData.concat(read);

    combinedArrays.forEach(item => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });

    return result;
  };

  render() {
    return (
      <div className="App">
        <DisplayUptime />
        <button onClick={() => this.grabRedditData(this.filterMangaTitle)}>
          REFRESH REDDIT LIST
        </button>
        <Unread unread={this.state.unread} handleClick={this.markRead} />
        <Read read={this.state.read} />
        <FilteredList filteredData={this.state.filteredData} />
        <RedditList redditData={this.state.redditData} />
      </div>
    );
  }
}

export default App;
