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
            userName: '',
            buttonDisabled: true,
            maxCharsClass: "invisible",
        };
    }

    static getDerivedStateFromProps(props, state) { // This is to keep child component updated from parent. There are probably more elegant and efficient solutions for this.
        if (props.userName !== state.userName) {
            return {
                userName: props.userName,
            };
        }
        return null;
    }

    componentDidMount() {
        this.setState({ userName: this.props.userName })
        console.log("create post comp did mount", this.state.userName)
    }

    handleNewTweetSubmit(event) {
        event.preventDefault();
        const newDate = new Date().toISOString();
        const tweetId = `tweet-${uuidv4()}`;
        //save to firebase database 
        microBlogDb.collection('tweets').doc(tweetId).set({
            userName: this.state.userName,
            content: this.state.content,
            tweetCreationDate: newDate,
        }).catch(function (error) {
        console.error("An error occurred:", error);
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