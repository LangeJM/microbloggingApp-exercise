import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
  Link
} from "react-router-dom";

const Navigation = () => {
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
                    <div className="px-2 pt-1">
                    Logged in as:
                    </div>
                    <div className="px-1 pt-1 mr-5">
                        Placeholder
                    </div>
                </div>
                <div className="ml-5 d-flex row">
                    Logout
                </div>
                <div>
                    <img src="../logout.svg" alt="Logout Icon"></img>
                </div>
            </div>
        </div>
    )
}

export default Navigation;

