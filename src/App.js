import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner'
import './App.css';

import axios from 'axios'

import Navigation from './components/Navigation'
import CreatePost from './components/CreatePost'
import PostsList from './components/PostsList'
import Profile from './components/Profile'

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
    this.interval = setInterval(() => this.getWithApi(), 60000);
    this.getWithApi();
  }

  async getWithApi() {
    this.setState({ isLoading: true })
    const apiUrl = this.apiUrl;
    try {
      const response = await axios.get(apiUrl);
      this.setState({ tweets:response.data.tweets })
    } catch (error) {
      console.error(error);
    }
    this.setState({isLoading:false})
  }  

  async postWithApi(newTweet) {
    this.setState({buttonDisabled:true})
    const apiUrl = this.apiUrl;
    try {
      const response = await axios.post(apiUrl, {
        content: newTweet.content,
        userName: this.state.userName,
        date: newTweet.date,
      });
      console.log(response)
    } catch (error) {
      console.error(error);
      window.confirm(`The tweet could not be posted. The server responded with : ${error}.`)
    }
    // this.getWithApi();
    this.setState({buttonDisabled:false})
  }

  onNewTweet(newTweet) {
    this.setState({ buttonDisabled: true })
    this.postWithApi(newTweet); 
    this.setState((state) => {
      return { tweets: [newTweet, ...state.tweets] }
    });
    this.setState({ buttonDisabled: false })
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
          <Route path="/">
            <div className="App justify-content-center">
              <Navigation />
              <CreatePost className="row d-flex" userName = {this.state.userName} onNewTweet={(newTweet) => this.onNewTweet(newTweet)} buttonDisabled={this.state.buttonDisabled}/>
              {element}
            </div>
        </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
