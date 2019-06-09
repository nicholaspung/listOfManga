import React from 'react';
import './App.css';
import FilteredList from './components/FilteredList';
import RedditList from './components/RedditList';

import mangaTitles from './titles';

class App extends React.Component {
  state = {
    redditData: [],
    filter: mangaTitles,
    filteredData: []
  }

  componentDidMount() {
    // fetch('https://www.reddit.com/r/manga.json')
    //   .then(res => res.json())
    //   .then(dataObject => this.setState({
    //     redditData: dataObject.data.children
    //   }))
    //   .then(e => this.filterMangaTitle());

    this.grabRedditData(this.filterMangaTitle);
  };

  filterMangaTitle = () => {
    this.setState(prevState => {
      return {
        filteredData: prevState.redditData.filter(post => {
          let result = '';
          for (let i=0; i<prevState.filter.length; i++) {
            if (post.data.title.includes(this.state.filter[i])) {
              result = true;
            }
          }
          return result;
        })
      }
    })
  }

  grabRedditData = (callback = console.log("Refreshing")) => {
    fetch('https://www.reddit.com/r/manga.json')
      .then(res => res.json())
      .then(dataObject => this.setState({
        redditData: dataObject.data.children
      }))
      .then(_ => callback());
    console.log("fetched data")
  }

  render() {
    return (
      <div className="App">
        <p>Generate Manga List by clicking on button.</p>
        <button onClick={this.filterMangaTitle}>FILTER LIST</button>
        <button onClick={() => this.grabRedditData(this.filterMangaTitle)}>REFRESH REDDIT LIST</button>
        <p>Filtered</p>
        <FilteredList filteredData={this.state.filteredData} />
        <p>Not filtered</p>
        <RedditList redditData={this.state.redditData} />
      </div>
    );
  }
}

export default App;
