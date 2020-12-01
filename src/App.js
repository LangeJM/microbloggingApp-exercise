import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'
import './App.css';
import localForage from "localforage";

// import { Container, Row } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    console.log('localforage is: ', localForage)
    this.getFromDb('posts').then((posts) => {
      this.setState(() => {
        return { posts }
      });
    })
  }

  saveToDb(newPost) {
    localForage.setItem('posts', newPost).then(() => {
    }).catch(function(err) {
        console.log(err);
    });    
  }

  getFromDb(key) {
    if (!localForage.getItem(key)) return;
    return localForage.getItem(key);
  }
  
  
  onNewTweet(newPost, ) {
    this.setState((state) => {
      return { posts: [newPost, ...state.posts] }
    });
    this.saveToDb(this.state.posts);
  }

  render() {
    return (
      <div className="App justify-content-center">
        <Navigation />
        <CreatePost className="row d-flex" onNewTweet={(newPost) => this.onNewTweet(newPost)} />
        <PostsList className="row d-flex" posts={this.state.posts} />
      </div>
    );
  }
  
}

export default App;
