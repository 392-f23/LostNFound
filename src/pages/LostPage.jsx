// import "./LostPage.css";
import { objectToArray } from "../utilities/helpers";
import PostCard from "../components/PostCard";

const LostPage = ({ posts }) => {
  const formattedPosts = objectToArray(posts);
  // sort by time
  formattedPosts.sort((x, y) => y.id - x.id);

  return (
    <div>
      <div className="lost-page container">
        <h2>Lost Items</h2>
        <div className="card-container">
          {formattedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LostPage;
