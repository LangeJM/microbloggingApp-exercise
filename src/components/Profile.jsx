import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            displayUsername: ''
        }
    }

    handleNewUsername(event) {
        let username = event.target.value; 
        this.setState({ username: username });
        // if (username === '' || tweetText.length > 140) this.setState({ buttonDisabled: true })
        // else this.setState({ buttonDisabled: false })
    }

    handleNewUsernameSubmit(event) {
        event.preventDefault();
        this.setState({displayUsername:this.state.username} )
        const newUsername = this.state.username;
        this.props.onNewUsername(newUsername);
        this.setState({ username:'' });
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center mt-5">
                <h1 className="mb-5">Profile</h1>
                <div className="row justify-content-center">
                    <label className="pl-2 mb-3 d-flex row width-30rem" htmlFor="userNameId"><strong>Current Username: {this.state.displayUsername} </strong></label>
                </div>
                <div className="row justify-content-center">
                    <InputGroup className="width-30rem mb-3 d-flex row">
                        <FormControl
                            placeholder="New Username"
                            aria-label="Recipient's username"
                            id="userNameId" 
                            value={this.state.username}
                            required
                            onChange={event => this.handleNewUsername(event)}
                        />
                        <InputGroup.Append>
                            <Button
                                onClick={event => this.handleNewUsernameSubmit(event)}
                                variant="outline-secondary">Change Username
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        )
    }

}

export default Profile;
