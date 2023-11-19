import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestsStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, body, userId].every(Boolean) && requestStatus === "idle";

  const onSavePosClicked = () => {
    if (canSave) {
      try {
        setRequestsStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Post Could Not Save", err);
      } finally {
        setRequestsStatus("idle");
      }
    }
  };

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

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <div>
        <h2 className="text-3xl">Edit Post</h2>
        <form className=" w-96 pt-4 grid">
          <label htmlFor="postTitle">Title</label>
          <input
            type="text"
            className=" outline-none border-2 rounded p-2 text-slate-950 mb-2"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postAuthor">Authors</label>
          <select
            value={userId}
            onChange={onAuthorChanged}
            className=" outline-none border-2 rounded p-2 text-slate-950 mb-2"
            name="postAuthor"
            id="postAuthor"
          >
            <option value=""></option>
            {usersOptions}
          </select>
          <label htmlFor="postBody">Content</label>
          <textarea
            name="postBody"
            id="postBody"
            className=" outline-none border-2 rounded p-2 text-slate-950 mb-2"
            value={body}
            onChange={onBodyChanged}
          ></textarea>
          <button
            className={
              canSave
                ? "my-4   bg-slate-600  text-white"
                : "my-4   bg-slate-100  text-slate-300"
            }
            onClick={onSavePosClicked}
            disabled={!canSave}
            type="button"
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={onDeletePostClicked}
            className="my-4  bg-red-500  text-white"
          >
            Delete Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPostForm;
