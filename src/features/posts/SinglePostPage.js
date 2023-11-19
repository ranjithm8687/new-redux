import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2> Post Not Found </h2>
      </section>
    );
  }
  return (
    <article className="border-2 p-4 space-y-2 rounded">
      <h2 className="text-2xl"> {post.title} </h2>
      <div> {post.body} </div>
      <div className=" flex">
        <PostAuthor userId={post.userId} /> <TimeAgo timestamp={post.date} />{" "}
        <Link className=" pl-2 underline" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

export default SinglePostPage;
