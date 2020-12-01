import React from 'react';
import { Card, Button, Form } from 'react-bootstrap'

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            timeStamp: ' ',
            postBody: ' ',
            postAuthor: ' ',
            buttonDisabled: true,
        };
        this.state = this.initialState;
    }

    resetState() {
        this.setState(this.initialState);
        console.log(this.state);
    }

    handleNewTweetSubmit(event) {
        event.preventDefault();
        let newDate = new Date();
        newDate = newDate.toString().split(' ');
        const timeStamp = `${newDate[1]} ${newDate[2]}, ${newDate[3]}, ${newDate[4]}`;
        const newPost = {
            timeStamp: timeStamp,
            postBody: this.state.postBody,
            postAuthor: 'Hans-Joachim Peter'
        };
        this.props.onNewTweet(newPost);  
        this.resetState(); //Why doesn't this work?
    }

    handleBodyChange(event) {
        this.setState({ postBody: event.target.value });
        if (this.state.postBody.length !== 0 && this.state.postBody.length <= 140) this.setState({ buttonDisabled: false })
        else this.setState({ buttonDisabled: true })
    }    

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card className="m-5 create-post">
                    <Card.Body >
                        <Form.Control as="textarea" rows={5} name="body" type="text" placeholder="Enter tweet text" value={this.postBody} required onChange={event => this.handleBodyChange(event)} />        
                        <Button variant="primary" type="submit" disabled={this.state.buttonDisabled} className="float-right mt-2" onClick={event => this.handleNewTweetSubmit(event)}>Tweet</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CreatePost;