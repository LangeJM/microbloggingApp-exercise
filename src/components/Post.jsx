

const Post = (props) => {

    return (
        <div className="border post p-3 my-1">
            <div className="d-flex row justify-content-between px-2 mb-2">
                <div>{props.postAuthor}</div>
                <div>{props.timeStamp}</div>
            </div>
            <div className="d-flex row px-2 text-left">
                {props.postBody}
            </div>
        </div>

    )

}

export default Post;