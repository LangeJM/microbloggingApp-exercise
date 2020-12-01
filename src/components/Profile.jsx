import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'username',
        }
    }

    render() {
        return (
            <div className="App justify-content-center">
                <label className="pl-5 d-flex row width-30rem" htmlFor="userNameId">Username</label>
                <InputGroup className="pl-5 width-30rem mb-3 d-flex row">
                    <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        id="userNameId" 
                    />
                    <InputGroup.Append>
                    <Button variant="outline-secondary">Button</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }

}

export default Profile;