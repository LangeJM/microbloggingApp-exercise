import React from 'react';
import { Card, Button, Form } from 'react-bootstrap'

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            date: ' ',
            content: ' ',
            userName: this.props.userName,
            buttonDisabled: true,
        };
        this.state = this.initialState;
    }

    handleNewTweetSubmit(event) {
        event.preventDefault();
        let newDate = new Date();
        newDate = newDate.toISOString();
        const newTweet = {
            date: newDate,
            content: this.state.content,
            userName: this.state.userName,
            key: `${this.state.userName}-${newDate}`,
        };
        this.props.onNewTweet(newTweet);
        this.setState({ content: '' });
    }

    handleBodyChange(event) {
        let tweetText = event.target.value; 
        this.setState({ content: tweetText });
        if (tweetText === '' || tweetText.length > 140) this.setState({ buttonDisabled: true })
        else this.setState({ buttonDisabled: false })
    }    

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card className="m-5 create-post">
                    <Card.Body >
                        <Form.Control as="textarea" rows={5} name="body" type="text" placeholder="Enter tweet text" value={this.state.content} required onChange={event => this.handleBodyChange(event)} />        
                        <Button variant="primary" type="submit" disabled={this.state.buttonDisabled} className="float-right mt-2" onClick={event => this.handleNewTweetSubmit(event)}>Tweet</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CreatePost;