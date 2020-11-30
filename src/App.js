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
  }

  saveToDb(newPost) {
    localForage.setItem('post', newPost).then(() => {
      // Do other things once the value has been saved.
      console.log('Post has been saved');
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });    
  }

  getFromDb() {
    localForage.getItem('somekey', 'some value').then(function (value) {
      // Do other things once the value has been saved.
      console.log(value);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });    
  }
  
  
  onNewTweet(newPost) {
    this.setState((state) => {
      return { posts: [newPost, ...state.posts] }
    });
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
