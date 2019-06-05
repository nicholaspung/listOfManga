import React from 'react';
import './App.css';
import List from './components/List';

class App extends React.Component {
  state = {
    redditData: []
  }

  fetchMangaData = () => {
    fetch('https://www.reddit.com/r/manga.json')
      .then(res => res.json())
      .then(dataObject => this.setState({
        redditData: dataObject.data.children
      }));
  };

  generateList = () => {
    this.fetchMangaData()
  }

  render() {
    return (
      <div className="App">
        <p>Generate Manga List by clicking on button.</p>
        <button onClick={this.generateList}>BUTTON</button>
        {this.state.redditData.map(post => <List post={post} key={post.data.id} />)}
      </div>
    );
  }
}

export default App;
