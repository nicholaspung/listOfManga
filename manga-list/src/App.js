import React from "react";
import "./App.css";
import FilteredList from "./components/FilteredList";
import RedditList from "./components/RedditList";
import DisplayUptime from "./components/DisplayUptime";
import Unread from "./components/Unread";
import Read from "./components/Read";
import MySavedTitles from "./components/MySavedTitles";

import mangaTitles from "./titles";

class App extends React.Component {
  state = {
    redditData: [],
    filter: mangaTitles,
    filteredData: [],
    unread: [],
    read: [],
    intervalId: "",
    localFilterData: []
  };

  componentDidMount() {
    this.grabRedditData(this.filterMangaTitle);
    this.setState({
      localFilterData: localStorage.getItem("titles").split(",")
    });
  }

  grabRedditData = filterFunction => {
    fetch("https://www.reddit.com/r/manga.json")
      .then(res => res.json())
      .then(dataObject =>
        this.setState({
          redditData: dataObject.data.children
        })
      )
      .then(_ => filterFunction(this.state.localFilterData));
    console.log("fetching new reddit list");
  };
  // can improve filter by making fuzzy filtering (like fuzzy searches)
  filterMangaTitle = filterList => {
    let filteringReddit = this.state.redditData.filter(post => {
      let result = false;
      filterList.forEach(title => {
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
  updateLocalFilterData = () => {
    let filteredData = localStorage.getItem("titles").split(",");
    this.setState(prevState => ({
      localFilterData: filteredData
    }));
    this.filterMangaTitle(filteredData);
  };
  // doesn't remove title from saved data - bug
  removeFromLocalStorage = title => {
    let removeTitleFromFilterList = this.state.localFilterData.filter(
      e => e !== title
    );
    let removeTitleFromReadList = this.state.read.filter(e => e !== title);
    this.setState(prevState => ({
      localFilterData: removeTitleFromFilterList
    }));
    this.setState(prevState => ({
      read: removeTitleFromReadList
    }));
    localStorage.setItem("titles", removeTitleFromFilterList);
    this.filterMangaTitle(removeTitleFromFilterList);
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
  checkIfAlreadyInRead = (filteredObjectData, read) => {
    let readIds = read.map(title => title.data.id);
    let result = [];
    let combinedArrays = filteredObjectData.concat(read);

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
        <div className="uptime">
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
        </div>
        <div className="list">
          <MySavedTitles
            mangaList={this.state.localFilterData}
            updateLocalFilterData={this.updateLocalFilterData}
            removeFromLocalStorage={this.removeFromLocalStorage}
          />
          <div className="read-unread">
            <Unread unread={this.state.unread} handleClick={this.markRead} />
            <Read read={this.state.read} />
          </div>
          <FilteredList filteredData={this.state.filteredData} />
          <RedditList redditData={this.state.redditData} />
        </div>
      </div>
    );
  }
}

export default App;
