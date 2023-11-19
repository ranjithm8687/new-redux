import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { useState } from "react";
import { addNewPost } from "./postsSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === "idle";

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onSavePosClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body, userId })).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Post could not Save", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl">Add Post</h2>
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
        </form>
      </div>
    </section>
  );
};

export default AddPostForm;
