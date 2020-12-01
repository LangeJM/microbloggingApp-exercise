import React from 'react';
import Post from './Post';

const PostsList = (props) => {
    return (
        <div className="d-flex align-items-center flex-column">
        {props.tweets.map(tweet => 
            <Post 
                key={tweet.id} 
                date={tweet.date}
                content={tweet.content}
                userName={tweet.userName}
            />
        )}
    </div>    
    )
}

export default PostsList;