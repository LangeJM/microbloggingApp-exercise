import React from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import {microBlogDb} from './firebase';
import { v4 as uuidv4 } from 'uuid';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            content: '',
            buttonDisabled: true,
            maxCharsClass: "invisible",
        };
    }

    // Would love to have some feedback on this. My state management had issues, so I did this which was to keep the child component updated from parent. There are most probably more elegant and efficient solutions for this.
    static getDerivedStateFromProps(props, state) { 
        if (props.userName !== state.userName) {
            return {
                userName: props.userName,
            };
        }
        return null;
    }

    handleNewTweetSubmit(event) {
        event.preventDefault();
        const newDate = new Date().toISOString();
        const tweetId = `tweet-${uuidv4()}`;
        //save to firebase database 
        microBlogDb.collection('tweets').doc(tweetId).set({
            userName: this.props.userName,
            content: this.state.content,
            tweetCreationDate: newDate,
        }).catch(function (error) {
        window.confirm("An error occurred while attempting to retrieve the tweets:", error);
        });
        this.setState({ content: '' });
    }

    handleBodyChange(event) {
        let tweetText = event.target.value; 
        this.setState({ content: tweetText });
        if (tweetText === '') this.setState({ buttonDisabled: true });
        else if (tweetText.length > 140) {
            this.setState({ buttonDisabled: true, maxCharsClass: "visible text-danger" });
        }
        else this.setState({ buttonDisabled: false, maxCharsClass: "invisible" });
    }    

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card className="m-5 create-post">
                    <Card.Body >
                        <Form.Control as="textarea" rows={5} name="body" type="text" placeholder="Enter tweet text" value={this.state.content} required onInput={event => this.handleBodyChange(event)} />
                        <span className={this.state.maxCharsClass}>Cannot contain more than 140 characters</span>
                        <Button variant="primary" type="submit" disabled={this.state.buttonDisabled} className="float-right mt-2" onClick={event => this.handleNewTweetSubmit(event)}>Tweet</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CreatePost;