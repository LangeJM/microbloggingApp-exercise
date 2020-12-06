import React from 'react';
import { Form, Image, Button, } from 'react-bootstrap'
import {microBlogDb} from './firebase';
import { v4 as uuidv4 } from 'uuid';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: 'Test0815',
            email: '',
            password: '',
            userImage: '',
            showChangesSaved: "invisible",
            submitDisabled: "",
            defaultProfileImage: this.props.defaultProfileImage
        }
    }

    handleNewUsername(event) {
        const userName = event.target.value; 
        this.setState({ userName: userName });
    }

    handleNewEmail(event) {
        const email = event.target.value;
        this.setState({ email: email });
        if (this.state.userName === '') this.setState({ username: email });
    }

    handleNewPassword(event) {
        const password = event.target.value; 
        this.setState({ password: password });
    }

    handleNewUsernameSubmit(event) {
        event.preventDefault();
        let { userName, email, password } = this.state;
        this.setState({
            userName: userName,
            email: email,
            password: password,
            showChangesSaved: 'visible',
        });
        const newUsername = this.state.userName;
        this.props.onNewUsername(newUsername);

        const userId = `user-${uuidv4()}`.split('-').slice(0, 3).join('-');
        const userDate = new Date();
        //save to firebase database 
        microBlogDb.collection('users').doc(userId).set({
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            userImage: this.state.userImage,
            userCreationDate: userDate
        }).catch(function (error) {
        console.error("An error occurred:", error);
        });
    }


    render() {
        return (
            <div className="d-flex flex-column justify-content-center mt-5">
                <div className="row justify-content-center ">
                    <h1 className="mb-5 text-left">Profile</h1>
                </div>
                <div className="row justify-content-center">
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                value={this.state.userName}
                                placeholder="User name"
                                onInput={event => this.handleNewUsername(event)}
                            />
                                
                            <Form.Text className="text-muted">
                                Will show email address when left empty.
                            </Form.Text>
                        </Form.Group>
                            
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={this.state.email}
                                placeholder="Enter email"
                                onInput={event => this.handleNewEmail(event)}
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onInput={event => this.handleNewPassword(event)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Form.Group>
                            {/* 
                            Need the comments here for future wip 
                            */}
                            <Image src={this.state.defaultProfileImage} alt="Default profile picture > cat" rounded fluid />
                            <Form.File 
                            className="position-relative"
                            // required
                            // name="file"
                            label="New Profile Picture"
                            // onChange={handleChange}
                            // isInvalid={!!errors.file}
                            // feedback={errors.file}
                            // id="validationFormik107"
                            // feedbackTooltip
                            />
                        </Form.Group>
                        <Button
                            variant="primary" type="submit"
                            onClick={event => this.handleNewUsernameSubmit(event)}
                        >
                            Save Changes
                        </Button>
                        <Form.Text
                            className={this.state.showChangesSaved}>
                            Changes Saved!
                        </Form.Text>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Profile;
