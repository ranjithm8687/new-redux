import { useSelector } from "react-redux";

//import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice"; // old
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice"; // new

import PostArticle from "./PostArticle";

const PostsList = () => {
  // const posts = useSelector(selectAllPosts);
  // const postsStatus = useSelector(getPostsStatus);
  // const error = useSelector(getPostsError);

  // let renderedPosts;

  // if (postsStatus === "loading") {
  //   renderedPosts = <p> loading... </p>;
  // } else if (postsStatus === "succeeded") {
  //   const orderedPosts = posts
  //     .slice()
  //     .sort((a, b) => b.date.localeCompare(a.date));
  //   renderedPosts = orderedPosts.map((post) => (
  //     <PostArticle post={post} key={post.id} />
  //   ));
  // } else if (postsStatus === "failed") {
  //   renderedPosts = <p> {error} </p>;
  // }

  const orderedPostsIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let renderedPosts;

  if (postsStatus === "loading") {
    renderedPosts = <p> loading... </p>;
  } else if (postsStatus === "succeeded") {
    renderedPosts = orderedPostsIds.map((postId) => (
      <PostArticle postId={postId} key={postId} />
    ));
  } else if (postsStatus === "failed") {
    renderedPosts = <p> {error} </p>;
  }

  return <div className=" space-y-3"> {renderedPosts} </div>;
};

export default PostsList;
