
const Post = (props) => {

    return (
        <div className="border post p-3 my-1">
            <div className="d-flex row justify-content-between px-2 mb-2 mx-0">
                <div className="text-primary">{props.userName}</div>
                <div className="text-secondary">{props.tweetCreationDate}</div>
            </div>
            <div className="d-flex row px-2 text-left mx-0">
                {props.content}
            </div>
        </div>
    )
}

export default Post;