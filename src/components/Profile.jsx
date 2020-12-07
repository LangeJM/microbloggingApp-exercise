import React from 'react';
import { Form, Image, Button, } from 'react-bootstrap'
import { microBlogDb } from './firebase';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ' ',
            email: ' ',
            uid: ' ',
            password: ' ',
            userImage: ' ',
            defaultImage: ' ',
            showChangesSaved: 'invisible',
            submitDisabled:  ' ',
        }
    }

    static getDerivedStateFromProps(props, state) { // This is to keep child component updated from parent. There are probably more elegant and efficient solutions for this.
        if (props.displayName !== state.userName) {
            return {
                userName: props.displayName,
                email: props.email,
                uid: props.uid,
                userImage: props.photoURL,
                defaultImage: props.defaultProfileImage,
            };
        }
        return null;
    }

    componentDidMount() {
        this.setState({
            userName: this.props.displayName,
            email: this.props.email,
            uid: this.props.uid,
            userImage: this.props.photoURL,
        })
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

        const userDate = new Date();
        //save to firebase database 
        microBlogDb.collection('users').doc(this.state.uid).set({
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
        const { userImage, defaultImage } = this.state;
        let profilePicture;
        if (userImage) profilePicture = userImage;
        else profilePicture = defaultImage;

        return (
            <div className="d-flex flex-column justify-content-center mt-5">
                <div className="row justify-content-center ">
                    <h1 className="mb-5 text-left">Profile</h1>
                </div>
                <div className="row justify-content-center">
                    <Form>
                        <Form.Group>
                            <Form.Label className='font-weight-bold ml-2'>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.userName}
                                placeholder="User name"
                                className='mb-4'
                                // onInput={event => this.handleNewUsername(event)}
                            />
                            <Form.Text className="text-muted">                      
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className='font-weight-bold ml-2'>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={this.state.email}
                                placeholder="Enter email"
                                className='mb-5'
                                // onInput={event => this.handleNewEmail(event)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            {/* 
                            Need the comments here for future wip 
                            */}
                            <Image src={profilePicture} alt="Default profile pic" className="profile-image" rounded fluid />
                            <Form.File 
                            className="position-relative mt-4"
                            // required
                            // name="file"
                            label="Upload New Profile Picture"
                            // onChange={handleChange}
                            // isInvalid={!!errors.file}
                            // feedback={errors.file}
                            // id="validationFormik107"
                            // feedbackTooltip
                            />
                        </Form.Group>
                        <Button
                            variant="primary" type="submit"
                            onClick={event => this.handleNewProfileImage(event)}
                            className='mt-4'
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
