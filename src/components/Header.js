import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount, increaseCount } from "../features/posts/postsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <header className=" bg-fuchsia-700 px-5  py-5  text-white">
      <div className=" flex justify-between">
        <h1 className=" text-3xl"> Redux Blog </h1>
        <nav>
          <ul className="flex space-x-3">
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/post"> Post </Link>
            </li>
            <li>
              <Link to="/user"> Authors </Link>
            </li>
          </ul>
          <button onClick={() => dispatch(increaseCount())}>{count}</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
