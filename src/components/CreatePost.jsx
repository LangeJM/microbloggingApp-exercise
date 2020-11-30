import React from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap'


class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStamp: ' ',
            postBody: ' ',
            postAuthor: ' ',
            buttonDisabled: true,
        }
    }

    handleBodyChange(event) {
        this.setState({ postBody: event.target.value });
        if (this.state.postBody.length !== 0 && this.state.postBody.length <= 140) this.setState({ buttonDisabled: false })
        else this.setState({ buttonDisabled: true })
    }    

    resetState() {
        const resetState = {
            timeStamp: ' ',
            postBody: ' ',
            postAuthor: ' ',
            buttonDisabled: true,
        }
        this.setState(resetState)
    
    } 

    handleNewTweetSubmit(event) {
        event.preventDefault();
        let newDate = new Date();
        newDate = newDate.toString().split(' ');
        const timeStamp = `${newDate[1]} ${newDate[2]}, ${newDate[3]}, ${newDate[4]}`;
        const newPost = {
            timeStamp: timeStamp,
            postBody: this.state.postBody,
            postAuthor: 'Som Oather'
        };
        this.props.onNewTweet(newPost);
        console.log(newPost);
        // this.setState(newPost);
        // this.setState({ buttonDisabled: true, postBody: '', timeStamp: '', postAuthor: '' }); //this does not work for some reason
        
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