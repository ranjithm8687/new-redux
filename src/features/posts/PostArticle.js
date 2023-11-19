import React, { useState } from "react";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostAuthor from "./PostAuthor";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById } from "./postsSlice";

//const PostArticle = ({ post }) => { // old
const PostArticle = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestsStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeletePostClicked = () => {
    try {
      setRequestsStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setBody("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Delete Post Could not completed", err);
    } finally {
      setRequestsStatus("idle");
    }
  };

  return (
    <article className="border-2 p-4 space-y-2 rounded">
      <h2 className="text-2xl"> {post.title.substring(0, 15)}... </h2>{" "}
      <div> {post.body.substring(0, 60)}... </div>
      <div className="  flex">
        <PostAuthor userId={post.userId} /> <TimeAgo timestamp={post.date} />
      </div>
      <div className="  flex">
        <Link className=" pl-2 underline" to={`post/${post.id}`}>
          View Post
        </Link>
        <Link className=" pl-2 underline" to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <button
          type="button"
          className=" pl-2 underline"
          onClick={onDeletePostClicked}
        >
          Delete
        </button>
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

// QUICK FIX

// let PostArticle = ({ post }) => {
//   const [title, setTitle] = useState(post?.title);
//   const [body, setBody] = useState(post?.body);
//   const [userId, setUserId] = useState(post?.userId);
//   const [requestStatus, setRequestsStatus] = useState("idle");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onDeletePostClicked = () => {
//     try {
//       setRequestsStatus("pending");
//       dispatch(deletePost({ id: post.id })).unwrap();
//       setTitle("");
//       setBody("");
//       setUserId("");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete Post Could not completed", err);
//     } finally {
//       setRequestsStatus("idle");
//     }
//   };

//   return (
//     <article className="border-2 p-4 space-y-2 rounded">
//       <h2 className="text-2xl"> {post.title.substring(0, 15)}... </h2>{" "}
//       <div> {post.body.substring(0, 60)}... </div>
//       <div className="  flex">
//         <PostAuthor userId={post.userId} /> <TimeAgo timestamp={post.date} />
//       </div>
//       <div className="  flex">
//         <Link className=" pl-2 underline" to={`post/${post.id}`}>
//           View Post
//         </Link>
//         <Link className=" pl-2 underline" to={`/post/edit/${post.id}`}>
//           Edit Post
//         </Link>
//         <button
//           type="button"
//           className=" pl-2 underline"
//           onClick={onDeletePostClicked}
//         >
//           Delete
//         </button>
//       </div>
//       <div>
//         <ReactionButtons post={post} />
//       </div>
//     </article>
//   );
// };

// PostArticle = React.memo(PostArticle);

export default PostArticle;
