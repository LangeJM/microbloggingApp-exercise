import React from 'react';
import { Form, Image, Button, } from 'react-bootstrap'
import { microBlogDb, firebaseStorage} from './firebase';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ' ',
            email: ' ',
            uid: ' ',
            userImage: ' ',
            defaultImage: ' ',
            showChangesSaved: 'invisible',
            pendingUserImage: ' ',
            errorMsgFileType: ' ',
        }
    }

    // This is to keep child component updated from parent. There are probably more elegant and efficient solutions for this.
    static getDerivedStateFromProps(props, state) { 
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

    handleImageChange(event) {
        const profileImage = event.target.files[0];
        this.setState({ pendingUserImage: profileImage, errorMsgFileType: ''})
    }

    handleNewProfileImage(event) {
        event.preventDefault();
        const fileTypeImage = this.state.pendingUserImage.name.split('.')[1];
        const supportImageTypes = ['jpeg', 'jpg', 'png', 'gif'];
        if (!supportImageTypes.includes(fileTypeImage)) {
            this.setState({ errorMsgFileType: `Please use one of the following formats: ${supportImageTypes.join(', ')}` })
            console.log(this.state.errorMsgFileType)
        } else {
            //store the image to Firebase Storage
            firebaseStorage.ref(`/images/${this.state.pendingUserImage.name}`).put(this.state.pendingUserImage) 
            // Get image URL from Firebase Storage and write it to User DB 
            firebaseStorage.ref('images').child(this.state.pendingUserImage.name).getDownloadURL() 
                .then(fireBaseUrl => { this.setState({ userImage: fireBaseUrl }) })
                .then(() => {
                    microBlogDb.collection('users').doc(this.state.uid).update({
                        'userObject.photoURL': this.state.userImage
                    })
                })
                .catch(function (error) {
                    console.error("An error occurred:", error);
                });
        }
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
                    <Form className="w-25">
                        <Form.Group>
                            <Form.Label className='font-weight-bold ml-2'>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.userName}
                                placeholder="User name"
                                className='mb-4'
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
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Image src={profilePicture} alt="Default profile pic" className="profile-image" rounded fluid />
                            <Form.File 
                                className="position-relative mt-4 font-weight-bold"
                                name="file"
                                label="Change Profile Picture"
                                onChange={event => this.handleImageChange(event)}
                                feedback={this.state.errorMsgFileType}
                                
                                feedbackTooltip={this.state.errorMsgFileType}
                            />
                            <div className ="font-weight-light text-danger">{this.state.errorMsgFileType}</div>
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
