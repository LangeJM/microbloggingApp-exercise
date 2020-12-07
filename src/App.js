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
      user: {},

      buttonDisabled: true,
      isLoading: false,
      isLoggedIn: true,
      logoutIcon: logoutIcon,
      defaultProfileImage: defaultProfileImage,
    }
  }
  
  componentDidMount() {
    this.isLoggedIn();
    this.alertOnNewDbDoc();
  }

  alertOnNewDbDoc() {
    microBlogDb.collection("tweets").onSnapshot((querySnapshot) => {
      if (querySnapshot) this.getFromFirebaseDb();
      console.log("fired up update from DB")
    });
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

  onNewUsername(newUsername) {
    this.setState({ userName: newUsername }); 
  }

  isLoggedIn() {
    let userObject = {};
    firebaseAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log("Logged in")
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
          console.log("Not logged in")
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
      console.log('Error getting document: ', error);
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
    const userRef = microBlogDb.collection('users').doc('RGWly4EFojPFOT6sehdGi1FMIqs2');
    userRef.get().then((doc) => {      
      this.setState({user: doc.data().userObject})
          
      }).catch(function (error) {
        console.log('Error getting document from DB: ', error);
      });
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
    };
    const navigationProps = <Navigation isLoggedIn = { this.state.isLoggedIn } logoutIcon = { this.state.logoutIcon } displayName = { this.state.user.displayName } />

    return (
      <Router>
        <Switch>
          <>
            <div className="App justify-content-center">
                <Route path="/profile">
                    {navigationProps}
                <Profile
                  displayName={this.state.user.displayName}
                  defaultProfileImage={this.state.defaultProfileImage}
                  email={this.state.user.email}
                  uid={this.state.user.uid}
                  photoURL={this.state.user.photoURL}
                  onNewUsername={(newUsername) => this.onNewUsername(newUsername)}
                />
                </Route>
                <Route path="/home">
                    {navigationProps}
                    <CreatePost className="row d-flex" userName={this.state.user.displayName} buttonDisabled={this.state.buttonDisabled}/>
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
