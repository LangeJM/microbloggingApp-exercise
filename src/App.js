import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { microBlogDb, firebaseAuth } from './components/firebase.js';
import InfiniteScroll from "react-infinite-scroll-component";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'
import Profile from './components/Profile'
import SignIn from './components/SignIn.jsx'

import logoutIcon from './logout.svg'
import defaultProfileImage from './defaultProfileImage.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      user: {},
      buttonDisabled: true,
      isLoggedIn: true,
      logoutIcon: logoutIcon,
      defaultProfileImage: defaultProfileImage,
    }
  }
  
  componentDidMount() {
    this.isLoggedIn();
    this.alertOnNewDbDoc();
  }

  componentWillUnmount() {
    // unsubscribe onSnapshot
  }

  alertOnNewDbDoc() {
    microBlogDb.collection("tweets").onSnapshot((querySnapshot) => {
      if (querySnapshot) this.getTweetsFromDb();
    });
  }

  getTweetsQuery = microBlogDb.collection("tweets").orderBy("tweetCreationDate", "desc").limit(10);

  getTweetsFromDb() {
    let tweetsArray = [];
    this.setState({ isLoading: true });
    this.getTweetsQuery
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          tweetsArray.push(doc.data());
        });
      })
      .then(() => this.setState({ tweets: tweetsArray, isLoading: false }));
  }

  handleMoreTweets() {
    let tweetsArray = [];
    this.setState({ isLoading: true });
    this.getTweetsQuery
      .startAfter(this.state.tweets[this.state.tweets.length - 1].tweetCreationDate)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          tweetsArray.push(doc.data());
        });
      })
      .then(() => this.setState({ tweets: [...this.state.tweets, ...tweetsArray], isLoading: false }));
  }

  isLoggedIn() {
    let userObject = {};
    firebaseAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        userObject = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
          userName: '',
        };
        this.checkDbUserExists(userObject)
      } else {
        if (this.state.isLoggedIn !== false) {
          this.setState({ isLoggedIn: false });
        };
      } 
    });
  }

  checkDbUserExists(userObject) {
    const userRef = microBlogDb.collection('users').doc(`${userObject.uid}`);
    userRef.get().then((doc) => {
      if (!doc.exists) {
        this.saveNewUserToDb(userObject)
        this.getUserFromDb(userObject)        
      } else {
        this.getUserFromDb(userObject)
      }
    }).catch(function (error) {
      console.error('Error getting document: ', error);
    });
  }

  saveNewUserToDb(userObject) {
    microBlogDb.collection('users').doc(userObject.uid).set({
      userObject
    }).catch(function (error) {
      console.error("An error occurred:", error);
    });
  }

  getUserFromDb(userObject) {
    const userRef = microBlogDb.collection('users').doc(userObject.uid);
    userRef.get().then((doc) => {      
      this.setState({user: doc.data().userObject})
          
      }).catch(function (error) {
        console.error('Error getting document from DB: ', error);
      });
  }

  render() {
    
    const navigationProps = <Navigation isLoggedIn = { this.state.isLoggedIn } logoutIcon = { this.state.logoutIcon } displayName = { this.state.user.displayName } />
    return (
      <Router>
        <Switch>
          <>
            <div className="App justify-content-center overflow-hidden">
                <Route path="/profile">
                    {navigationProps}
                <Profile
                  displayName={this.state.user.displayName}
                  defaultProfileImage={this.state.defaultProfileImage}
                  email={this.state.user.email}
                  uid={this.state.user.uid}
                  photoURL={this.state.user.photoURL}
                />
                </Route>
                <Route path="/home">
                    {navigationProps}
                    <CreatePost className="row d-flex" userName={this.state.user.displayName} buttonDisabled={this.state.buttonDisabled}/>
                    <PostsList className="row d-flex" tweets={this.state.tweets} />
                </Route>
                <Route exact path="/">
              <SignIn isLoggedIn={ this.state.isLoggedIn}/>
                </Route>              
            </div>
            <InfiniteScroll
              dataLength={this.state.tweets.length}
              next={() => this.handleMoreTweets()}
              hasMore={true}
              scrollThreshold={"50px"}
              loader={<h4>Loading...</h4>} // Fix has more to when end of db reached 
            >
            </InfiniteScroll>
            
          </>
        </Switch>
      </Router>
    );
  }
}

export default App;
