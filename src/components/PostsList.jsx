import React from 'react';
import Post from './Post';

const PostsList = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <div className= "d-flex flex-column align-items-center">
                {props.tweets.map(tweet =>
                    <Post  
                        key = { tweet.id } // Cannot pass key as unique tweet id to component tag.. Also passing to div at Post component does not work..!
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