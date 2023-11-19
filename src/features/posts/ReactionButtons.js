import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const ReactionButtons = ({ post }) => {
  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "💘",
    rocket: "🚀",
    coffee: "☕",
  };

  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
        type="button"
        key={name}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
