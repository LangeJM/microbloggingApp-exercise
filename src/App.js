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
      tweetBatchesInDb: '',
      counterTweetScrolls: 0,
    }
  }
  
  componentDidMount() {
    this.isLoggedIn();
    this.alertOnNewDbDoc();
    microBlogDb.collection("tweets").get().then( (querySnapshot) => {
      this.setState({tweetBatchesInDb: Math.ceil(querySnapshot.size/10)})
});
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
    const { tweets, counterTweetScrolls } = this.state;
    let tweetsArray = [];
    this.setState({ isLoading: true });
    this.getTweetsQuery
      .startAfter(tweets[tweets.length - 1].tweetCreationDate)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          tweetsArray.push(doc.data());
        });
      })
      .then(() => this.setState({ tweets: [...tweets, ...tweetsArray], isLoading: false }));
    this.setState({ counterTweetScrolls: counterTweetScrolls + 1 })
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
    const { isLoggedIn, logoutIcon, user, defaultProfileImage, buttonDisabled, tweets, counterTweetScrolls, tweetBatchesInDb } = this.state;
    const navigationProps = <Navigation isLoggedIn = { isLoggedIn } logoutIcon = { logoutIcon } displayName = { user.displayName } />
    return (
      <Router>
        <Switch>
          <>
            <div className="App justify-content-center overflow-hidden">
                <Route path="/profile">
                    {navigationProps}
                  <Profile
                    displayName={user.displayName}
                    defaultProfileImage={defaultProfileImage}
                    email={user.email}
                    uid={user.uid}
                    photoURL={user.photoURL}
                  />
                </Route>
                <Route path="/home">
                    {navigationProps}
                    <CreatePost className="row d-flex" userName={user.displayName} buttonDisabled={buttonDisabled}/>
                    <PostsList className="row d-flex" tweets={tweets} />
                    <InfiniteScroll className="m-3 d-flex justify-content-center"
                      dataLength={tweets.length}
                      next={() => this.handleMoreTweets()}
                      hasMore={counterTweetScrolls < tweetBatchesInDb}
                      scrollThreshold={"100px"}
                      loader={<h4>Loading...</h4>} 
                      // endMessage={"No more tweets to fetch" }
                    >
                    </InfiniteScroll>
                </Route>
                <Route exact path="/">
              <SignIn isLoggedIn={ isLoggedIn}/>
                </Route>              
            </div>
          </>
        </Switch>
      </Router>
    );
  }
}

export default App;
