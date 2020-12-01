import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
      buttonDisabled: false,
      isLoading: false,
    }
    this.apiUrl = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
  }

  componentDidMount() {
    this.getWithApi();
  }

  async getWithApi() {
    this.setState({isLoading:true})
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
    const apiUrl = this.apiUrl;
    try {
      const res = await axios.post(apiUrl, {
        content: newTweet.content,
        userName: newTweet.userName,
        date: newTweet.date,
      });
      console.log(`Status code: ${res.status}`); //potential implementation of dialog to inform user when post req not successful..see below. This comment serves as a temporary reminder and will be deleted eventually.
    } catch (error) {
      console.error(error);
      window.confirm(`The tweet could not be posted. The server responded with: ${error}.`)
    }
    this.getWithApi();
  }

  onNewTweet(newTweet) {
    this.setState({ buttonDisabled: true })
    this.postWithApi(newTweet); 
    this.setState({ buttonDisabled: false })
  }

  render() {
    const isLoading = this.state.isLoading;
    let element;
    if (isLoading) {
      element = <div className="mt-5">
        <Spinner animation="border" />
        <div className="mt-3">Updating Page...</div>
        </div>;
    } else {
      element = <PostsList className="row d-flex" tweets={this.state.tweets} />;
    }
    return (
      <Router>
        <Switch>
          <Route path="/home">
            <div className="App justify-content-center">
            <Navigation />
            <CreatePost className="row d-flex" onNewTweet={(newTweet) => this.onNewTweet(newTweet)} buttonDisabled={this.state.buttonDisabled} this />
            {element}
            </div>
          </Route>
          <Route path="/profile">
            <Navigation />
            <Profile />
          </Route>
          <Route path="/">
          <Navigation />
        </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
