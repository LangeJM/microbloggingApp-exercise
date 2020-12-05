import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner'
import './App.css';

import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'
import Profile from './components/Profile'
import SignIn from './components/SignIn.jsx'
// import microBlogDb from './components/firebase.js';
import {microBlogDb} from './components/firebase.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      buttonDisabled: true,
      isLoading: false,
      userName: 'DemoNap',
    }
    this.apiUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
  }

  componentDidMount() {
    this.getFromFirebaseDb();    
  }

  getFromFirebaseDb() {
    let tweetsArray = [];
    this.setState({ isLoading: true })
    microBlogDb.collection("tweets").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        tweetsArray.push(doc.data());
        tweetsArray = tweetsArray.sort((a, b) => (a.tweetCreationDate < b.tweetCreationDate) ? 1 : ((b.tweetCreationDate < a.tweetCreationDate) ? -1 : 0));   
        });
    }).then(() => this.setState({ tweets: tweetsArray, isLoading: false }));
  }

  onNewTweet() {
    this.getFromFirebaseDb();
  }

  onNewUsername(newUsername) {
    this.setState({ userName: newUsername }); 
  }

  render() {
    const isLoading = this.state.isLoading;
    let element;
    if (isLoading) {
      element = <div className="mt-5 d-flex flex-column align-items-center">
        <Spinner animation="border" />
        <div className="row mt-3">Updating Page...</div>
        </div>;
    } else {
      element = <PostsList className="row d-flex" tweets={this.state.tweets} />;
    }
    return (
      <Router>
        <Switch>
          <Route path="/profile">
            <div className="App justify-content-center">
            <Navigation />
            <Profile displayUsername = {this.state.userName} onNewUsername={(newUsername) => this.onNewUsername(newUsername)}/>
            </div>
          </Route>
          <Route path="/home">
            <div className="App justify-content-center">
              <Navigation />
              <CreatePost className="row d-flex" userName = {this.state.userName} onNewTweet={(newTweet) => this.onNewTweet(newTweet)} buttonDisabled={this.state.buttonDisabled}/>
              {element}
            </div>
          </Route>
          <Route path="/">
            <div className="App justify-content-center">
              <SignIn />
            </div>
        </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
