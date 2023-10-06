import "./PostCard.css";

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <div className="card-body">
                {/* <div className="post-image">
                    <img src={post.image} alt={post.title} />
                </div> */}
                <div className="description">
                    {post.description}
                </div>
                <div className="location">
                    Location: {post.location}
                </div>
                <div className="name">
                    By: {post.name}
                </div>
            </div>
            <button className="button">More Information</button>
        </div>
    );
}

export default PostCard;