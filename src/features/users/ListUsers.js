import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const ListUsers = () => {
  const users = useSelector(selectAllUsers);
  const renderedUsers = users.map((user) => (
    <li className=" leading-8" key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section>
      <h2 className=" text-3xl">Users List</h2>
      <ul className=" list-disc list-inside pt-3">{renderedUsers}</ul>
    </section>
  );
};

export default ListUsers;
