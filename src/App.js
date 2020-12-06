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
import { microBlogDb, firebaseAuth } from './components/firebase.js';
import logoutIcon from './logout.svg'
import defaultProfileImage from './defaultProfileImage.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      buttonDisabled: true,
      isLoading: false,
      userName: 'DemoNap',
      logoutIcon: logoutIcon,
      defaultProfileImage: defaultProfileImage,
      isLoggedIn: null,
    }
  }

  componentDidMount() {
    this.getFromFirebaseDb();    
    this.isLoggedIn();
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

  isLoggedIn() {
      firebaseAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log("Logged in")
      } else {
        if (this.state.isLoggedIn !== false) {
          this.setState({ isLoggedIn: false });
          console.log("Not logged in")
        };
      }
    });
  }

  render() {
    // this.isLoggedIn();
    const isLoading = this.state.isLoading;
    let element;
    if (isLoading) {
      element = <div className="mt-5 d-flex flex-column align-items-center">
        <Spinner animation="border" />
        <div className="row mt-3">Updating Page...</div>
        </div>;
    } else {
      element = <PostsList className="row d-flex" tweets={this.state.tweets} />;
    };

    return (
      <Router>
        <Switch>
          <>
            <div className="App justify-content-center">
                <Route path="/profile">
                    <Navigation isLoggedIn={this.state.isLoggedIn} logoutIcon={this.state.logoutIcon}/>
                    <Profile defaultProfileImage={this.state.defaultProfileImage} displayUsername = {this.state.userName} onNewUsername={(newUsername) => this.onNewUsername(newUsername)}/>
                </Route>
                <Route path="/home">
                    <Navigation isLoggedIn={this.state.isLoggedIn} logoutIcon={this.state.logoutIcon}/>
                    <CreatePost className="row d-flex" userName = {this.state.userName} onNewTweet={(newTweet) => this.onNewTweet(newTweet)} buttonDisabled={this.state.buttonDisabled}/>
                    {element}
                </Route>
                <Route exact path="/">
              <SignIn isLoggedIn={ this.state.isLoggedIn}/>
                </Route>              
            </div>
          </>
        </Switch>
      </Router>
    );
  }
}

export default App;
