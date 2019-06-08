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


  componentDidMount() {
    fetch('https://www.reddit.com/r/manga.json')
      .then(res => res.json())
      .then(dataObject => this.setState({
        redditData: dataObject.data.children
      }));
  };

  filterMangaTitle = () => {
    this.setState(prevState => {
      return {
        filteredData: prevState.redditData.filter(post => {
          for (let i=0; i<prevState.filter.length; i++) {
            if (post.data.title.includes(this.state.filter[i])) {
              return true
            }
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <p>Generate Manga List by clicking on button.</p>
        <button onClick={this.filterMangaTitle}>FILTER LIST</button>
        <p>Filtered</p>
        {this.state.filteredData.map(post => <List post={post} key={post.data.id} />)}
        <p>Not filtered</p>
        {this.state.redditData.map(post => <List post={post} key={post.data.id} />)}
      </div>
    );
  }
}

export default App;
