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
    read: [],
    intervalId: ""
  };

  componentDidMount() {
    this.grabRedditData(this.filterMangaTitle);
    // setInterval(() => this.grabRedditData(this.filterMangaTitle), 60000);
  }

  filterMangaTitle = () => {
    let filteringReddit = this.state.redditData.filter(post => {
      let result = false;
      this.state.filter.forEach(title => {
        if (post.data.title.includes(title)) result = true;
      });
      return result;
    });
    let filteringFilteredReddit = this.checkIfAlreadyInRead(
      filteringReddit,
      this.state.read
    );

    this.setState(prevState => ({ filteredData: filteringReddit }));
    this.setState(prevState => ({ unread: filteringFilteredReddit }));
  };

  grabRedditData = callback => {
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
    let readIds = read.map(title => title.data.id);
    let result = [];
    let combinedArrays = filteredData.concat(read);

    combinedArrays.forEach(item => {
      if (!readIds.includes(item.data.id)) {
        result.push(item);
        readIds.push(item.data.id);
      }
    });

    return result;
  };

  toggleAutoRefresh = e => {
    let checked = e.target.checked;
    let intervalId;
    const startRefresh = () => {
      intervalId = setInterval(
        () => this.grabRedditData(this.filterMangaTitle),
        60000
      );
      this.setState(() => ({ intervalId: intervalId }));
    };

    const stopRefresh = () => {
      clearInterval(this.state.intervalId);
    };

    checked ? startRefresh() : stopRefresh();
  };

  render() {
    return (
      <div className="App">
        <DisplayUptime />
        <button onClick={() => this.grabRedditData(this.filterMangaTitle)}>
          REFRESH REDDIT LIST
        </button>
        <div>
          <input
            type="checkbox"
            name="autorefresh"
            onClick={this.toggleAutoRefresh}
          />
          <label htmlFor="autorefresh">Toggle Auto-Refresh</label>
        </div>
        <Unread unread={this.state.unread} handleClick={this.markRead} />
        <Read read={this.state.read} />
        <FilteredList filteredData={this.state.filteredData} />
        <RedditList redditData={this.state.redditData} />
      </div>
    );
  }
}

export default App;
