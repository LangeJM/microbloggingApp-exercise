import React from 'react';
import Post from './Post';
import { v4 as uuidv4 } from 'uuid';

const PostsList = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className= "d-flex flex-column align-items-center">
                {props.tweets.map(tweet =>
                    <Post  
                        key = { uuidv4() } 
                        tweetCreationDate={tweet.tweetCreationDate}
                        content={tweet.content}
                        userName={tweet.userName}
                    />
                )}
            </div>
        </div>    
    )
}

export default PostsList;