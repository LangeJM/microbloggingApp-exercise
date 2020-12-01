import React from 'react';
// import { Container, Row } from 'react-bootstrap';
import Post from './Post';


const PostsList = (props) => {
    return (
        <div className="d-flex align-items-center flex-column">
        {props.posts.map(post => 
            <Post 
                key={post.timeStamp} 
                timeStamp={post.timeStamp}
                postBody={post.postBody}
                postAuthor={post.postAuthor}
            />
            )}
    </div>    
    )
}

export default PostsList;