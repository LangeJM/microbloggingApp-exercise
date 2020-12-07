import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  Link
} from "react-router-dom";
import { firebase } from './firebase.js';
import { Redirect } from "react-router-dom";

const Navigation = (props) => {

    function handleLogOut(event) {
        event.preventDefault();
        console.log('Logging out')
        firebase.auth().signOut().then(function() {
            console.log('sign out successful')
        }).catch(function(error) {
            console.log(error);
        });
    }

    if (props.isLoggedIn === false) {
      console.log(props.isLoggedIn);
      return <Redirect to="/" />
    } else {
    return (
        <div className="nav-bar d-flex justify-content-center" >
            <div className="ml-5">
                <Navbar>
                <Navbar.Brand>Micro Blogging App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link className="m-2" to="/home" href="#home"><strong>Home</strong></Link>
                        <Link className="m-2" to="/profile" href="#link"><strong>Profile</strong></Link>
                    </Nav>
                </Navbar>
            </div>
            <div className="ml-auto d-flex justify-content-center flex-column">
                <div className="d-flex row">
                    <div className="small px-2 pt-1">
                    Logged in as:
                    </div>
                    <div className="small px-1 pt-1 mr-5">
                        {props.displayName}
                    </div>
                </div>
                <div className="ml-5 d-flex row small">
                    <button id="logout-button" type="button" className="mt-1 btn-sm btn-primary d-flex align-items-center" onClick={event => handleLogOut(event)}>
                    <div className='small mr-2'>Logout</div>
                    <img id="logout-image" src={props.logoutIcon} alt="Logout Icon"></img>
                    </button>
                </div>
            </div>
        </div>
    )}
}

export default Navigation;

